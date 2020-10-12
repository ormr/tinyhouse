interface IBody<TVariables> {
  query: string;
  variables?: TVariables;
}

interface Error {
  message: string;
}

export const server = {
  fetch: async <TData = any, TVariables = any>(
    body: IBody<TVariables>
  ) => {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error('ДУДОС');
    }

    return res.json() as Promise<{ data: TData, errors: Error[] }>;
  }
};