import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import { profilePhotos } from './components/ProfilePhotos';
import { isConnected } from './config/connections';
jest.mock('axios');
// CRA's Jest resolver does not understand the newer router export map.
jest.mock('react-router-dom', () => jest.requireActual('../node_modules/react-router-dom/dist/index.js'), { virtual: true });
jest.mock('react-router/dom', () => jest.requireActual('../node_modules/react-router/dist/development/dom-export.js'), { virtual: true });
beforeAll(() => { HTMLElement.prototype.scrollIntoView = jest.fn(); });

test('home search validates age range and preserves selected filters in the directory', async () => {
  open('/');
  fireEvent.change(screen.getByRole('combobox', { name: 'Minimum age' }), { target: { value: '35' } });
  fireEvent.change(screen.getByRole('combobox', { name: 'Maximum age' }), { target: { value: '25' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search profiles' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Minimum age must be lower');
  fireEvent.change(screen.getByRole('combobox', { name: 'Maximum age' }), { target: { value: '40' } });
  fireEvent.change(screen.getByLabelText('Religion'), { target: { value: 'Hindu' } });
  fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Namakkal' } });
  fireEvent.click(screen.getByRole('button', { name: 'Search profiles' }));
  await screen.findByText('Discover compatible profiles');
  expect(screen.getByLabelText('Age from')).toHaveValue(35);
  expect(screen.getByLabelText('Age to')).toHaveValue(40);
  expect(screen.getByLabelText('Religion')).toHaveValue('Hindu');
  expect(screen.getByLabelText('District')).toHaveValue('Namakkal');
});
test('home visitor calls to action lead to registration and search stays accessible', () => {
  localStorage.clear(); open('/');
  expect(screen.getByRole('link', { name: 'New Varan Kongu Thirumana Matrimony home' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'New Varan Kongu Thirumana Matrimony' })).toBeInTheDocument();
  expect(screen.queryByText('Namakkal Matrimony')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Start your journey' })).toHaveAttribute('href', '/register');
  expect(screen.getByRole('link', { name: 'Join New Varan Kongu Thirumana Matrimony' })).toHaveAttribute('href', '/register');
  expect(screen.queryByRole('link', { name: 'Search profiles' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Search profiles' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});
const me = { _id: 'me', name: 'Own Member', age: 30, gender: 'Male', image: '/own.jpg', profilePhotos: ['/own.jpg', '/second.jpg'], familyPhotos: ['/family.jpg'], acceptedRequests: ['connected'], interestRequests: ['pending'], favoriteProfiles: [] };
const connected = { _id: 'connected', name: 'Connected Member', age: 29, gender: 'Female', image: '/other.jpg', acceptedRequests: [], interestRequests: [] };
const pending = { _id: 'pending', name: 'Pending Member', age: 28, gender: 'Female', image: '/pending.jpg', interestRequests: [] };
beforeEach(() => {
  jest.clearAllMocks(); localStorage.clear(); localStorage.setItem('token', 'fixture'); localStorage.setItem('user', JSON.stringify(me));
  window.alert = jest.fn();
  axios.get.mockImplementation(url => Promise.resolve({ data: url.endsWith('/users') ? [pending, connected, me] : url.endsWith('/me') ? me : connected }));
});
function open(path) { window.history.replaceState({}, '', path); return render(<App />); }
test('directory filters caste, education, marital status and occupation and clears all', async () => {
  axios.get.mockResolvedValue({ data: [
    { ...connected, caste: 'Kongu', education: 'B.E.', maritalStatus: 'Never Married', occupationType: 'Job' },
    { ...pending, caste: 'Other', education: 'MBA', maritalStatus: 'Divorcee', occupationType: 'Business' },
  ] });
  open('/profiles'); await screen.findByText('Connected Member');
  for (const [name, value] of [['Caste', 'Kongu'], ['Education', 'B.E.'], ['Marital status', 'Never Married'], ['Occupation', 'Job']]) {
    fireEvent.change(screen.getByRole('combobox', { name }), { target: { value } });
  }
  expect(document.querySelectorAll('.directory-card')).toHaveLength(1);
  expect(screen.queryByRole('heading', { name: 'Pending Member' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Search profiles' }));
  fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
  expect(document.querySelectorAll('.directory-card')).toHaveLength(2);
  expect(screen.getByRole('radio', { name: 'Anyone' })).toBeChecked();
});

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
  fireEvent.click(screen.getByRole('tab', { name: 'Accepted (2)' }));
  expect(screen.getAllByRole('link', { name: 'Chat' })).toHaveLength(2);
});
test('accepted profile view hides interest action and shows Chat for receiver too', async () => {
  open('/profile/connected'); await screen.findByRole('link', { name: 'Chat' });
  expect(screen.queryByRole('button', { name: /Send Interest|Interest Sent/ })).not.toBeInTheDocument();
});
test('mother tongue belongs to personal details and phone hide option is absent', async () => {
  open('/edit/me'); await screen.findByPlaceholderText('Mother Tongue');
  const mother = screen.getByPlaceholderText('Mother Tongue');
  const heading = screen.getByRole('heading', { name: /Personal Details/ });
  expect(heading.compareDocumentPosition(mother) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(document.querySelector('[name="hideMobile"]')).toBeNull();
  expect(screen.queryByText(/Additional Religious Details/)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Religion Details' })).not.toBeInTheDocument();
  const religion = screen.getByRole('heading', { name: /Religion & Horoscope/ });
  const kuladeivam = screen.getByPlaceholderText('Kuladeivam');
  expect(religion.compareDocumentPosition(kuladeivam) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(kuladeivam.compareDocumentPosition(screen.getByPlaceholderText('Star (Nakshatra)')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
test('edit profile has labeled fields, no section shortcuts and protected save state', async () => {
  let complete;
  axios.put.mockImplementation(() => new Promise(resolve => { complete = resolve; }));
  open('/edit/me');
  await waitFor(() => expect(screen.getAllByRole('button', { name: 'Save Profile' })[0]).toBeEnabled());
  expect(screen.getByLabelText('Name')).toHaveValue('Own Member');
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Member' } });
  expect(screen.queryByRole('link', { name: 'Personal Details' })).not.toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('button', { name: 'Save Profile' })[0]);
  expect(screen.getAllByRole('button', { name: 'Updating...' })).toHaveLength(2);
  expect(axios.put).toHaveBeenCalledTimes(1);
  expect(axios.put.mock.calls[0][1].get('name')).toBe('Updated Member');
  complete({ data: { ...me, name: 'Updated Member' } });
  await screen.findByText('Discover compatible profiles');
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
test('saved profiles retain View and Remove and offer direct Chat for each saved member', async () => {
  axios.get.mockImplementation(url => Promise.resolve({ data: url.endsWith('/favorites') ? [connected, pending] : me }));
  open('/saved');
  await screen.findAllByRole('link', { name: 'Chat' });
  expect(screen.getAllByRole('link', { name: 'Chat' })).toHaveLength(2);
  expect(screen.getAllByRole('link', { name: 'View Profile' })).toHaveLength(2);
  expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(2);
  expect(document.querySelector('a[href="/chat/pending"]')).toBeInTheDocument();
});
test('saved profile Chat does not require an extra connection lookup', async () => {
  axios.get.mockImplementation(url => url.endsWith('/favorites') ? Promise.resolve({ data: [connected] }) : Promise.reject(new Error('Offline')));
  open('/saved'); await screen.findByRole('button', { name: 'Remove' });
  expect(screen.getByRole('link', { name: 'Chat' })).toHaveAttribute('href', '/chat/connected');
  expect(axios.get).toHaveBeenCalledTimes(1);
});
test('saved profile removal updates the list and counter without hiding other cards', async () => {
  axios.get.mockResolvedValue({ data: [connected, pending] });
  axios.put.mockResolvedValue({ data: { message: 'Removed' } });
  open('/saved'); await screen.findAllByRole('button', { name: 'Remove' });
  fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
  await waitFor(() => expect(screen.queryByRole('heading', { name: 'Connected Member' })).not.toBeInTheDocument());
  expect(screen.getByRole('heading', { name: 'Pending Member' })).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(1);
  expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/favorite/connected'), {}, expect.any(Object));
});
test('failed saved-profile load shows a retry instead of an empty collection', async () => {
  axios.get.mockRejectedValueOnce(new Error('Offline')).mockResolvedValue({ data: [connected] });
  open('/saved'); await screen.findByRole('alert');
  expect(screen.queryByText('No Saved Profiles')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByRole('heading', { name: 'Connected Member' });
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
test('chat loads authenticated messages and sends trimmed text without duplicate submission', async () => {
  const message = { _id: 'message-one', sender: 'connected', text: 'Hello there', createdAt: '2026-10-11T06:00:00Z' };
  axios.get.mockImplementation(url => Promise.resolve({ data: url.includes('/messages/') ? [message] : connected }));
  let finish;
  axios.post.mockImplementation(() => new Promise(resolve => { finish = resolve; }));
  open('/chat/connected'); await screen.findByText('Hello there');
  const input = screen.getByRole('textbox', { name: 'Message' });
  fireEvent.change(input, { target: { value: '  Nice to meet you  ' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/messages'), { sender: 'me', receiver: 'connected', text: 'Nice to meet you' }, expect.objectContaining({ headers: { Authorization: 'Bearer fixture' } }));
  finish({ data: {} });
  await waitFor(() => expect(input).toHaveValue(''));
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/messages/me/connected'), expect.objectContaining({ headers: { Authorization: 'Bearer fixture' } }));
});
test('failed chat send keeps the draft and displays a clear error', async () => {
  axios.get.mockImplementation(url => Promise.resolve({ data: url.includes('/messages/') ? [] : connected }));
  axios.post.mockRejectedValue(new Error('Offline'));
  open('/chat/connected'); await screen.findByText('No messages yet');
  const input = screen.getByRole('textbox', { name: 'Message' });
  await waitFor(() => expect(input).not.toBeDisabled());
  fireEvent.change(input, { target: { value: 'Keep this draft' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
  await screen.findByRole('alert');
  expect(input).toHaveValue('Keep this draft');
  expect(screen.getByRole('button', { name: 'Send message' })).not.toBeDisabled();
});
test('chat offers retry when message loading fails', async () => {
  let fail = true;
  axios.get.mockImplementation(url => url.includes('/messages/') && fail ? Promise.reject(new Error('Offline')) : Promise.resolve({ data: url.includes('/messages/') ? [] : connected }));
  open('/chat/connected'); await screen.findByRole('alert');
  fail = false; fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByText('No messages yet');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
test('request tabs support keyboard navigation and search by district', async () => {
  axios.get.mockResolvedValue({ data: [me, { ...pending, district: 'Namakkal' }, connected] });
  open('/interest-requests'); await screen.findByRole('heading', { name: 'Pending Member' });
  fireEvent.change(screen.getByRole('textbox', { name: 'Search requests' }), { target: { value: 'Namakkal' } });
  expect(screen.getByRole('heading', { name: 'Pending Member' })).toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox', { name: 'Search requests' }), { target: { value: 'no-match' } });
  expect(screen.getByText('No matching profiles')).toBeInTheDocument();
  fireEvent.click(within(screen.getByRole('tabpanel')).getByRole('button', { name: 'Clear search' }));
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Received (1)' }), { key: 'End' });
  expect(screen.getByRole('tab', { name: 'Accepted (1)' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('link', { name: 'Chat' })).toHaveAttribute('href', '/chat/connected');
});
test('rejecting a request removes it without adding an accepted connection', async () => {
  axios.get.mockResolvedValue({ data: [me, pending, connected] });
  axios.put.mockResolvedValue({ data: {} });
  open('/interest-requests'); await screen.findByRole('button', { name: 'Reject' });
  fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
  await screen.findByText('Interest request rejected');
  expect(screen.getByRole('tab', { name: 'Received (0)' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Accepted (1)' })).toBeInTheDocument();
});
test('failed acceptance keeps the pending request visible and shows an error', async () => {
  axios.get.mockResolvedValue({ data: [me, pending, connected] });
  axios.put.mockRejectedValue(new Error('Offline'));
  open('/interest-requests'); await screen.findByRole('button', { name: 'Accept' });
  fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
  await screen.findByRole('alert');
  expect(screen.getByRole('heading', { name: 'Pending Member' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Accept' })).not.toBeDisabled();
});
test('customer settings live inside the account dropdown and home headings have no forced breaks', () => {
  open('/');
  expect(within(screen.getByRole('navigation', { name: 'Main navigation' })).queryByRole('link', { name: 'Settings' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Account options' }));
  expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/account-settings');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('link', { name: 'Settings' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: 'Explore profiles' })).toHaveLength(1);
  expect(document.querySelector('.hero-benefits')).toBeNull();
  expect(document.querySelectorAll('.home-section-heading h2 br,.final-cta h2 br')).toHaveLength(0);
});
test('customer profile view does not display the member mobile number', async () => {
  axios.get.mockImplementation(url => Promise.resolve({ data: url.endsWith('/me') ? me : { ...connected, mobile: '0000000000', hideMobile: false } }));
  open('/profile/connected'); await screen.findByRole('heading', { name: 'Connected Member', level: 1 });
  expect(screen.queryByText('0000000000')).not.toBeInTheDocument();
  expect(document.querySelector('a[href^="tel:"]')).toBeNull();
});
test('expired saved-profile session offers sign-in instead of repeated retries', async () => {
  axios.get.mockRejectedValue({ response: { status: 401 } });
  open('/saved'); await screen.findByRole('alert');
  expect(screen.getByRole('alert')).toHaveTextContent('session is no longer valid');
  expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '/login');
  expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
});
test('saved profiles with missing user session never request an undefined account', async () => {
  localStorage.removeItem('user'); open('/saved');
  await screen.findByText('Please sign in again to load your saved profiles.');
  expect(axios.get).not.toHaveBeenCalled();
});
test('deleted saved profiles are omitted without breaking the collection', async () => {
  axios.get.mockResolvedValue({ data: [null, connected] });
  open('/saved'); await screen.findByRole('heading', { name: 'Connected Member' });
  expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(1);
});
