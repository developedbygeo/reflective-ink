export const constructURL = (path: string) => window.location.origin + path;

export const sendRequestForNewEntry = async (content: string) => {
  const res = await fetch(
    new Request(constructURL('/api/my-journal'), {
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

export const sendRequestForEntryUdate = async (id: string, content: string) => {
  const res = await fetch(
    new Request(constructURL(`/api/my-journal/${id}`), {
      method: 'PATCH',
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

export const sendQaQuestion = async (question: string) => {
  const res = await fetch(
    new Request(constructURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({
        question,
      }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
