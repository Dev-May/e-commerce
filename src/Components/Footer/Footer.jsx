import {
  FaDiscord,
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import logo from "./../../assets/freshcart-logo.svg";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={logo} className="h-8 mx-2" alt="FreshCart Logo" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://flowbite.com/"
                    className="hover:underline hover:text-[#0aad0a]"
                  >
                    Flowbite
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline hover:text-[#0aad0a]"
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline hover:text-[#0aad0a]"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline hover:text-[#0aad0a]"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline hover:text-[#0aad0a]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline hover:text-[#0aad0a]">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-[#0aad0a]">
            © 2025 {"{"}" "{"} "}
            <a
              href=""
              className="text-[#0aad0a] hover:underline hover:text-[#0aad0a]"
            >
              FreshCart™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-[#0aad0a] dark:hover:text-white"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#0aad0a] dark:hover:text-white ms-5"
            >
              <FaDiscord />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#0aad0a] dark:hover:text-white ms-5"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#0aad0a] dark:hover:text-white ms-5"
            >
              <FaGithub />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-[#0aad0a] dark:hover:text-white ms-5"
            >
              <FaDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
