import { useState } from "react";

interface AnimatedImageProps {
  src: string;
  className?: string;
  onClick?: () => void;
  alt?: string;
}

const AnimatedImage = ({
  src,
  className = "",
  onClick,
  alt = "",
}: AnimatedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      onLoad={() => setLoaded(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
      className={`object-cover ${className}`}
    />
  );
};

export default AnimatedImage;
