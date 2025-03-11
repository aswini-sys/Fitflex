import React from 'react';
import styled from 'styled-components';

// Define styled components
const StyledFooter = styled.footer`
  background-color: #111;
  color: #fff;
  padding: 40px 20px;
  font-family: Arial, sans-serif;
  font-size: 1rem;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

const FooterSection = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 250px;
`;

const Heading = styled.h3`
  border-bottom: 2px solid #FFAC1C;
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: #FFAC1C;
  font-size: 1.4rem;
`;

const Paragraph = styled.p`
  margin: 8px 0;
  line-height: 1.6;
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 5px 0;
  font-size: 1rem;
  
  &:hover {
    color: #ff6600;
  }
`;

const SocialIcon = styled.a`
  display: inline-block;
  width: 30px;
  height: 30px;
  margin: 0 8px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${props => props.iconUrl});
  filter: grayscale(100%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%);
  }
`;

const SocialIconsContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <FooterSection>
          <Heading>Contact Information</Heading>
          <Paragraph><strong>Phone:</strong> (91) 9566585043</Paragraph>
          <Paragraph><strong>Email:</strong> ddensingh19@gmail.com</Paragraph>
          <Paragraph><strong>Address:</strong> 47B/4B ChurchStreet, Paramarthalingapurm, Vetturnimadam, Nagercoil, Kannyakumari</Paragraph>
        </FooterSection>

        <FooterSection>
          <Heading>Follow Us</Heading>
          <SocialIconsContainer>
            <SocialIcon href="https://facebook.com" iconUrl="https://static.vecteezy.com/system/resources/previews/018/930/476/original/facebook-logo-facebook-icon-transparent-free-png.png" aria-label="Facebook" />
            <SocialIcon href="https://instagram.com" iconUrl="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" aria-label="Instagram" />
            <SocialIcon href="https://twitter.com" iconUrl="https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png" aria-label="Twitter" />
            <SocialIcon href="https://github.com" iconUrl="https://cdn.iconscout.com/icon/free/png-256/free-github-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432516.png?f=webp&w=256" aria-label="GitHub" />
            <SocialIcon href="https://leetcode.com" iconUrl="https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png" aria-label="LeetCode" />
            <SocialIcon href="https://hackerrank.com" iconUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/HackerRank_Icon-1000px.png/800px-HackerRank_Icon-1000px.png" aria-label="HackerRank" />
            <SocialIcon href="mailto:ddensingh19@gmail.com" iconUrl="https://static.vecteezy.com/system/resources/thumbnails/020/964/377/small_2x/gmail-mail-icon-for-web-design-free-png.png" aria-label="Email" />
          </SocialIconsContainer>
        </FooterSection>

        <FooterSection>
          <Heading>Quick Links</Heading>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/help-support">Help & Support</Link>
          <Link href="/membership-info">Membership Information</Link>
          <Link href="/app-updates">App Updates</Link>
          <Link href="/feedback">Feedback</Link>
        </FooterSection>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
