import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
export default function Page() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          <div>
            <nav className="text-center py-4">
              <ul>
                <li className="inline-block px-4">
                  <button
                    className="bg-blue-400 my-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => signIn()}
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </nav>
            <div className="text-center my-14">
              <br></br>
              <div className="text-3xl text-center my-5 font-medium">
                {" "}
                You are not Signed in
                <span className="text-blue-400"></span>
              </div>
              <br />
            </div>
          </div>
        </>
      )}
      {session && (
        <>
          <nav className="text-center py-4">
            <ul>
              <li className="inline-block px-4">
                <button
                  className="bg-blue-400 my-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => signOut()}
                >
                  Sign Out
                </button>
              </li>
              <li className="inline-block">
                <Link href="home">
                  <button className="bg-blue-400 my-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Home
                  </button>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-center my-14">
            <br></br>
            <div className="text-3xl text-center my-5 font-medium">
              {" "}
              Signed in as{" "}
              <span className="text-blue-400">{session.user.name}</span>
            </div>
            <br />
          </div>
        </>
      )}
    </>
  );
}
