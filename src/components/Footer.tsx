import { FooterRoot } from "./styleds/FooterRoot";
import facebook from "../assets/facebook.svg";
import intagrem from "../assets/instagram.svg";
import linkedin from "../assets/linkedin.svg";
import { Container } from "./styleds/Container";
import { Link } from "react-router-dom";

const links = [
  { img: facebook, alt: "Facebook svg", to: "https://pt-br.facebook.com/" },
  { img: intagrem, alt: "Instagram svg", to: "https://www.instagram.com/" },
  { img: linkedin, alt: "Linkedin svg", to: "https://www.linkedin.com/" },
];

export function Footer() {
  return (
    <Container notPadding>
      <FooterRoot>
        
          About &bull; Contact &bull; Terms of Use &bull; Privacy Policy
          <p>@ Schreiber Marcio 2024. All Rights Reserved</p>
        

        <nav>
          {links.map((link) => {
            return (
              <Link to={link.to} target="_blank">
                <img src={link.img} alt={link.alt} />
              </Link>
            );
          })}
        </nav>
      </FooterRoot>
    </Container>
  );
}
