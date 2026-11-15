export async function onRequest(context) {
  return new Response(JSON.stringify({ message: "Hello from the same domain!" }), {
    headers: { "Content-Type": "application/json" },
  });
}