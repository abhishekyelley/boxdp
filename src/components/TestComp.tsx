export interface TestCompProps {
  image: string;
  imagePosition?: string;
  filmName: string;
  filmYear: string;
  reviewerName: string;
  reviewerId: string;
  reviewRating: number;
  reviewContent: string;
}
export default function TestComp({
  image,
  imagePosition,
  filmName,
  filmYear,
  reviewerName,
  reviewRating,
  reviewContent,
  reviewerId,
}: TestCompProps) {
  const fullStars = Math.floor(reviewRating);
  const hasHalfStar = reviewRating % 1 !== 0;

  const stars = [
    ...Array.from({ length: fullStars }, (_, index) => (
      <img
        key={`full-${index}`}
        src="http://localhost:3000/star.svg"
        alt="full star"
        style={{ width: "35px", height: "35px", marginRight: "7px" }}
      />
    )),
    hasHalfStar && (
      <img
        key="half-star"
        src="http://localhost:3000/half_star.svg"
        alt="half star"
        style={{ width: "20px", height: "30px", top: "4px" }}
      />
    ),
  ];
  return (
    <div
      style={{
        height: "1080px",
        width: "1080px",
        // backgroundColor: "transparent",
        backgroundImage: `url(${image})`,
        backgroundSize: "1920px 1080px",
        // 0 to -840px. why? idk. mid point will be -420px
        backgroundPosition: "-420px 0px",
        display: "flex",
        flexDirection: "column-reverse",
        letterSpacing: "-2px",
      }}
    >
      <div
        style={{
          background: "rgba(17,16,17,0.5)",
          display: "flex",
          flexDirection: "column",
          borderRadius: "100px 100px 0 0",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            margin: "35px 50px",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "40px", fontWeight: "700" }}>
            {filmName} ({filmYear}), dir. Greta Gerwig
          </span>
          <span style={{ fontSize: "25px", fontWeight: "300" }}>
            Review by {reviewerName} (@{reviewerId})
          </span>
          {reviewRating > 0 && <span>{stars}</span>}
          <span
            style={{
              fontSize: "35px",
              fontWeight: "400",
            }}
          >
            {reviewContent}
          </span>
          <div
            style={{
              display: "flex",
              top: "55px",
              justifyContent: "space-between",
            }}
          >
            <img
              src="http://localhost:3000/tmdb.svg"
              alt="tmdb logo"
              style={{ width: "170px", height: "25px" }}
            />
            <img
              src="http://localhost:3000/logo.svg"
              alt="logo"
              style={{ width: "60px", height: "60px", top: "-20px" }}
            />
            <img
              src="http://localhost:3000/letterboxd.svg"
              alt="letterboxd logo"
              style={{ width: "210px", height: "25px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
