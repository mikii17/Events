import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-primary">
        <div className=" min-h-[200px] max-w-[1024px] flex flex-col gap-12 items-center justify-center mx-auto px-2 ">
            <div className="flex gap-10">
                <a href="https://facebook.com" target="_blank" className="group">
                    <FaFacebook className="social-icon" size={44} />
                </a>
                <a href="https://github.com" target="_blank">
                   <FaGithub className="social-icon" size={44} />
                </a>
                <a href="https://twitter.com" target="_blank">
                    <FaTwitter className="social-icon" size={44} />
                </a>
                <a href="https://instagram.com" target="_blank">
                    <FaInstagram className="social-icon" size={44} />
                </a>
            </div>
        </div>
        <div className="bg-secondary py-7">
            <p className="text-center text-primary">© {(new Date()).getFullYear()} Eventify. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer