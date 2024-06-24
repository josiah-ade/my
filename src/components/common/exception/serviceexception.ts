export function handleError(e: any): never {
    const message = e.response?.data?.message || "Network Error";
    if (Array.isArray(message)) {
      const error = message.join("\n");
      console.log({ error });
      throw new Error(error);
    }
    throw new Error(message);
  }