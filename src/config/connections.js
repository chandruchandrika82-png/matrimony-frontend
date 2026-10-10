export const includesMember = (values, id) => Boolean(id && values?.some(value => String(value?._id || value) === String(id)));
export const isConnected = (me, other) => Boolean(me && other && (includesMember(me.acceptedRequests, other._id) || includesMember(other.acceptedRequests, me._id)));
