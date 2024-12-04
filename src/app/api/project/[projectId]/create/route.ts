export async function POST(
    request: Request,
    { params }: { params: { projectId: string } }
    ) {
  const body = await request.json();
  const rtb = await request.headers.get('Authorization');
  const { projectId } = params;
  
  const backend = process.env.BACKEND || "http://localhost:8080/";

  try {
      const response = await fetch(`${backend}api/project/${projectId}/create`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `${rtb}`
          },
          body: JSON.stringify({ "name": body.name, "description": body.description, "dependencies": [projectId] })
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      // Get response as text since it's a JWT token
      const token = await response.text();
      
      // Return the token as plain text
      return new Response(token, {
          headers: {
              'Content-Type': 'text/plain'
          }
      });
  } catch (error: any) {
      console.error('Generate access error:', error);
      return Response.json({ error: error.message }, { status: 500 });
  }
}