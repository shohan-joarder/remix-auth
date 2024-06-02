// app/routes/protected.jsx
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "../utils/auth.server";

export async function loader({request}) {
    let user = await requireUser(request);
    return { user };
}

export default function Protected() {

    let { user } = useLoaderData();

    return <div>Welcome to the protected route! {user.username}</div>;
}
