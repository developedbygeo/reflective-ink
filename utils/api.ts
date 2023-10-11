export const constructURL = (path: string) => window.location.origin + path;

export const createNewJournalEntry = async (content: string) => {
  const res = await fetch(
    new Request(constructURL('/api/journal'), {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
