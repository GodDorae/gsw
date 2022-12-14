import styled from "styled-components";

const GalleryContainer = styled.div`
  width: 80%;
  height: 70rem;
  margin-bottom: 3rem;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

function Gallery() {
  return (
    <GalleryContainer>
      <GalleryImage src="assets/gsw-bg.jpg" />
    </GalleryContainer>
  );
}

export default Gallery;
