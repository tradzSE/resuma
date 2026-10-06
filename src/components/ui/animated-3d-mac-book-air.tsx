import Image from "next/image";

interface MacbookProps {
  screenImage: string;
  screenAlt: string;
}

export function Macbook({ screenImage, screenAlt }: MacbookProps) {
  return (
    <div className="macbook-static" role="img" aria-label={screenAlt}>
      <div className="macbook-static-screen" aria-hidden="true">
        <span className="macbook-static-camera" />
        <div className="macbook-static-display">
          <Image src={screenImage} alt="" fill sizes="(max-width: 720px) 90vw, 1040px" quality={92} unoptimized />
        </div>
      </div>
      <div className="macbook-static-hinge" aria-hidden="true" />
      <div className="macbook-static-base" aria-hidden="true"><span /></div>
    </div>
  );
}

export default Macbook;
