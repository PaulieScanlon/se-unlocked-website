import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "../styles/markdown.css";
import * as styles from "../styles/posts-detail.module.css";
import { Container } from "react-bootstrap";

export default function PostsDetails({ data }) {
  const { html } = data.markdownRemark;
  const {
    title,
    thumbnail,
    thumbnail_alt,
    permalink,
    post_header_image,
    audio,
    sc_audio,
  } = data.markdownRemark.frontmatter;

  const { transcript } = data

  let audio_player
  if (sc_audio) {
    audio_player = (<iframe height="200px" width="100%" frameborder="no" scrolling="no" seamless src={sc_audio} title={title}></iframe>)
  } else {
    audio_player = <audio controls preload="none">
          <source src={audio} />
        </audio>
  }

  let transcript_html
  if (transcript) {
    transcript_html = (<div dangerouslySetInnerHTML={{ __html: transcript.html }} />)
  } else {
    transcript_html = (<p>Transcript coming soon...</p>)
  }

  return (
    <Layout>
      <Container className="podcast_details_container">
        {/* <GatsbyImage image={getImage(post_header_image)} alt={permalink} /> */}
        {/* <audio controls preload="none">
          <source src={audio} />
        </audio> */}
        {audio_player}
        <h1 className={styles.podcast_details}>{title}</h1>
       
        <div>
          {/* <div>
          <GatsbyImage image={getImage(thumbnail)} alt={permalink} />
        </div> */}
          <div className={styles.episode_details}>
            {/* <GatsbyImage
              className={styles.podcast_guest_picture}
              image={getImage(thumbnail)}
              alt={thumbnail_alt}
            /> */}
            {/* {<div dangerouslySetInnerHTML={{ __html: html }} />} */}
            {<div dangerouslySetInnerHTML={{ __html: html }} />}
                    {transcript_html}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const query = graphql`
  query PostPage($permalink: String) {
    markdownRemark(
      frontmatter: { permalink: { eq: $permalink }, type: { eq: "post" } }
    ) {
      html
      frontmatter {
        title
        type
        permalink
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 200
            )
          }
        }
        post_header_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        thumbnail_alt
        audio
        sc_audio
      }
    }

    transcript: markdownRemark(
    frontmatter: {type: {eq: "transcript"}, permalink: {eq: $permalink}}) {
    html
    }
  }
`;
