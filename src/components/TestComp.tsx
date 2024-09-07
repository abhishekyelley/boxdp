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
  return (
    <div
      style={{
        height: "1080px",
        width: "1080px",
        backgroundImage: `url("${image}")`,
        backgroundSize: "1920px 1080px",
        // 0 to -840px. why? idk. mid point will be -420px
        backgroundPosition: "-420px 0px",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          borderRadius: "50px 50px 0 0",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <h1>{filmName}</h1>
          <p>{reviewContent}</p>
        </div>
      </div>
    </div>
  );
}

/*
<article
  style={{
    margin: "auto",
    display: "flex",
    height: "1080px",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "1440px",
    backgroundColor: "#1e293b", // Equivalent to bg-slate-800
    userSelect: "none",
    ...backgroundImageStyle,
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      padding: "3rem",
      height: "50%",
    }}
  >
    <p
      style={{
        fontSize: "3rem",
        fontWeight: "bold",
        paddingBottom: "0.75rem",
      }}
    >
      {filmName}
      <sup style={{ paddingLeft: "0.75rem", fontSize: "1.875rem" }}>
        {filmYear}
      </sup>
    </p>
    <p
      style={{
        fontWeight: 600,
        fontSize: "1.875rem",
        paddingBottom: "0.75rem",
      }}
    >
      Review by {reviewerName} (@{reviewerId})
    </p>
    <p
      style={{
        fontWeight: 600,
        fontSize: "1.875rem",
        paddingBottom: "0.75rem",
      }}
    >
      {reviewContent}
    </p>
  </div>
</article>
*/
