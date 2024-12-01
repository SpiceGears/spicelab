// app/api/user/getInfo/route.ts
export async function POST(request: Request) {
    try {
        const backend = process.env.BACKEND|| "http://localhost:8080/"; // Ensure this URL is correct
        
        const rtb = request.headers.get("Authorization");
        console.log("Authorization header:", rtb);
        
        const requestBody = JSON.stringify({ token: rtb });
        console.log("Request body:", requestBody);
        
        const response = await fetch(`${backend}api/auth/generateAccess`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${rtb}`
            },
            body: requestBody
        });
        
        console.log("Response status:", response.status);
        console.log("Response status text:", response.statusText);
        
        if (!response.ok) {
            console.log("Failed response:", response);
            throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Response data:", data);
        
        return Response.json(data);
    } catch (error: any) {
        // Handle any errors
        console.error('Error:', error);
        throw new Error(error);
    }
}