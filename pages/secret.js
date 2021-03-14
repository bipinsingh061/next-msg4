import { session, signIn, signOut, useSession } from "next-auth/client";

export default function Secret() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          <div>
            You are not authorized to see this secret page please sign in
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        </>
      )}

      {session && (
        <>
          <div>
            this is the secret , the protected route :)
            <button onClick={() => signOut()}>Sign Out</button>
          </div>
        </>
      )}
    </>
  );
}
