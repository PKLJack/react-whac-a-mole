import React from "react"
import { ReactComponent as GithubIcon } from "../images/GithubIcon.svg"

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        Made by
        <a href="https://github.com/PKLJack" className="footer__link code">
          <GithubIcon />
          PKLJack
        </a>
      </div>
      <div>
        <a
          className="footer__source code"
          href="https://github.com/PKLJack/react-whac-a-mole"
        >
          view source
        </a>
      </div>
      <div>
        Build with <span className="code footer__build-with">React</span>
      </div>
    </footer>
  )
}

export default Footer
