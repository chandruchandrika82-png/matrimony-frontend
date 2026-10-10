import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { profilePhotos } from './components/ProfilePhotos';
import { isConnected } from './config/connections';
jest.mock('axios');
// CRA's Jest resolver does not understand the newer router export map.
jest.mock('react-router-dom', () => jest.requireActual('../node_modules/react-router-dom/dist/index.js'), { virtual: true });
jest.mock('react-router/dom', () => jest.requireActual('../node_modules/react-router/dist/development/dom-export.js'), { virtual: true });
const me = { _id: 'me', name: 'Own Member', age: 30, gender: 'Male', image: '/own.jpg', profilePhotos: ['/own.jpg', '/second.jpg'], familyPhotos: ['/family.jpg'], acceptedRequests: ['connected'], interestRequests: ['pending'], favoriteProfiles: [] };
const connected = { _id: 'connected', name: 'Connected Member', age: 29, gender: 'Female', image: '/other.jpg', acceptedRequests: [], interestRequests: [] };
const pending = { _id: 'pending', name: 'Pending Member', age: 28, gender: 'Female', image: '/pending.jpg', interestRequests: [] };
beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear(); localStorage.setItem('token', 'fixture'); localStorage.setItem('user', JSON.stringify(me));
  window.alert = jest.fn();
  axios.get.mockImplementation(url => Promise.resolve({ data: url.endsWith('/users') ? [pending, connected, me] : url.endsWith('/me') ? me : connected }));
});
function open(path) { window.history.replaceState({}, '', path); return render(<App />); }
test('own profile is first, all photo groups are browsable, and accepted member has Chat', async () => {
  open('/profiles'); await screen.findByText('Connected Member');
  const cards = document.querySelectorAll('.directory-card');
  expect(within(cards[0]).getByRole('heading', { name: 'Own Member' })).toBeInTheDocument();
  expect(within(cards[0]).getByText('My profile')).toBeInTheDocument();
  expect(within(cards[0]).getByText('1 / 3')).toBeInTheDocument();
  fireEvent.click(within(cards[0]).getByRole('button', { name: 'Next photo' }));
  expect(within(cards[0]).getByRole('img').src).toContain('/second.jpg');
  expect(screen.getByRole('link', { name: 'Chat' })).toHaveAttribute('href', '/chat/connected');
  expect(screen.getByRole('link', { name: 'Own Member' })).toHaveAttribute('href', '/my-dashboard');
  expect(screen.getAllByRole('button', { name: 'Go back' })).toHaveLength(1);
});
test('Tamil language persists and option values remain English API values', async () => {
  open('/profiles'); await screen.findByText('Connected Member');
  fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), { target: { value: 'ta' } });
  expect(screen.getByText('என் சுயவிவரம்')).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'பெண்கள்' })).toHaveValue('Female');
  await waitFor(() => expect(localStorage.getItem('customerLanguage')).toBe('ta'));
  expect(document.documentElement.lang).toBe('ta');
});
test('accept removes pending request and makes connection available in accepted tab', async () => {
  let accepted = false;
  axios.get.mockImplementation(() => Promise.resolve({ data: [accepted ? { ...me, interestRequests: [], acceptedRequests: ['connected', 'pending'] } : me, pending, connected] }));
  axios.put.mockImplementation(() => { accepted = true; return Promise.resolve({ data: { message: 'Accepted' } }); });
  open('/interest-requests'); await screen.findByRole('button', { name: 'Accept' });
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  await waitFor(() => expect(screen.queryByRole('button', { name: 'Accept' })).not.toBeInTheDocument());
  fireEvent.click(screen.getByRole('button', { name: 'Accepted (2)' }));
  expect(screen.getAllByRole('link', { name: 'Chat' })).toHaveLength(2);
});
test('accepted profile view hides interest action and shows Chat for receiver too', async () => {
  open('/profile/connected'); await screen.findByRole('link', { name: 'Chat' });
  expect(screen.queryByRole('button', { name: /Send Interest|Interest Sent/ })).not.toBeInTheDocument();
});
test('mother tongue belongs to personal details and phone hide option is absent', async () => {
  open('/edit/me'); await screen.findByPlaceholderText('Mother Tongue');
  const mother = screen.getByPlaceholderText('Mother Tongue');
  const heading = screen.getByText(/Personal Details/);
  expect(heading.compareDocumentPosition(mother) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(document.querySelector('[name="hideMobile"]')).toBeNull();
  expect(screen.queryByText(/Additional Religious Details/)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Religion Details' })).not.toBeInTheDocument();
  const religion = screen.getByRole('heading', { name: /Religion & Horoscope/ });
  const kuladeivam = screen.getByPlaceholderText('Kuladeivam');
  expect(religion.compareDocumentPosition(kuladeivam) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(kuladeivam.compareDocumentPosition(screen.getByPlaceholderText('Star (Nakshatra)')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
test('add profile keeps religion and horoscope fields in one section', () => {
  open('/my-profile');
  const heading = screen.getByRole('heading', { name: /Religion & Horoscope/ });
  const section = heading.parentElement;
  expect(section.querySelector('[name="religion"]')).not.toBeNull();
  expect(section.querySelector('[name="kuladeivam"]')).not.toBeNull();
  expect(section.querySelector('[name="star"]')).not.toBeNull();
  expect(section.querySelector('[name="motherTongue"]')).toBeNull();
});
test('connection is recognized for sender and receiver, not pending interests', () => {
  expect(isConnected(me, connected)).toBe(true);
  expect(isConnected(connected, me)).toBe(true);
  expect(isConnected(me, pending)).toBe(false);
});
test('private photos remain hidden from other members but available to the owner', () => {
  expect(profilePhotos({ ...me, hidePhotos: true })).toEqual([]);
  expect(profilePhotos({ ...me, hidePhotos: true }, true)).toHaveLength(3);
});
