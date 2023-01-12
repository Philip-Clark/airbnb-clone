import { useEffect, useState } from 'react';

export default function ListingTile({ data }) {
  const [render, setRender] = useState(true);
  const image = data.picture_url;
  useEffect(() => {
    fetch(data.picture_url).then((r) => {
      setRender(r.ok);
    });
  }, [render, data.picture_url]);

  if (!render) return;
  return (
    <a className="ListingTile" href={image}>
      <div className="preview">
        <img src={image + '?im_w=720'} alt="..." width="0" loading="eager" />
      </div>

      <h4 className="location">
        {data.neighbourhood_cleansed}, {data.neighbourhood_group_cleansed}
      </h4>
      <h4 className="details">
        {data.beds} bed{data.beds > 1 && 's'}, {data.bathrooms_text}
      </h4>
      <h4 className="price">{data.price} night</h4>
    </a>
  );
}
