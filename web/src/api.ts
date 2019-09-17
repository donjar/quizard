const apiUrl = "http://165.22.54.169";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    body: JSON.stringify({email: email, password: password})
  });

  const data = await res.json();
  console.log(data);
}
