import {
  component$,
  useClientEffect$,
  useStyles$,
  useStore,
} from "@builder.io/qwik";
import styles from "./random-photos.css";

export const RandomPhotos = component$((props: { imageCount?: number }) => {
  type ImageSpec = { url: string; name: string };

  const maxImageDim = 325;
  const minImageDim = 225;
  const defaultImageCount = 60;
  const count = props.imageCount || defaultImageCount;
  const Filters = ["grayscale", "sepia", "none"];
  const Categories = ["animals", "people", "arch", "nature"];

  useStyles$(styles);

  const defaultSpecs: ImageSpec[] = [];
  const store = useStore({
    imageSpecs: defaultSpecs,
  });

  useClientEffect$(() => {
    const createImage = (imageName: string) => {
      const filter = Filters[Math.floor(Math.random() * Filters.length)];
      const category =
        Categories[Math.floor(Math.random() * Categories.length)];

      const width = Math.floor(
        Math.random() * (maxImageDim - minImageDim + 1) + minImageDim
      );
      const height = Math.floor(
        Math.random() * (maxImageDim - minImageDim + 1) + minImageDim
      );
      const url = `http://placeimg.com/${width}/${height}/${category}/${filter}`;
      return { url: url, name: imageName };
    };
    const createImageSpecs = () => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(createImage(`Image ${i + 1}`));
      }
      return result;
    };
    store.imageSpecs = createImageSpecs();
  });

  return (
    <div class="images-list">
      {store.imageSpecs.map((image) => (
        <Photo name={image.name} url={image.url} />
      ))}
    </div>
  );
});

export const Photo = component$((props: { name: string; url: string }) => {
  return (
    <img
      alt={props.name}
      onClick$={() => console.log(`Clicked ${props.name}`)}
      src={props.url}
    />
  );
});

