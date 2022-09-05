import {
  component$,
  useClientEffect$,
  useStyles$,
  useStore,
  useRef,
  useWatch$,
} from "@builder.io/qwik";
import styles from "./random-photos.css";

type ImageSpec = {
  name: string;
  width: number;
  height: number;
  category: string;
  filter: string;
};

export const RandomPhotos = component$((props: { imageCount?: number }) => {
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
    const createImageSpec = (imageName: string) => {
      const imageSpec: ImageSpec = {
        name: imageName,
        filter: Filters[Math.floor(Math.random() * Filters.length)],
        category: Categories[Math.floor(Math.random() * Categories.length)],
        width: Math.floor(
          Math.random() * (maxImageDim - minImageDim + 1) + minImageDim
        ),
        height: Math.floor(
          Math.random() * (maxImageDim - minImageDim + 1) + minImageDim
        ),
      };
      return imageSpec;
    };
    const createImageSpecs = () => {
      const result = [];
      for (let i = 0; i < count; i++) {
        result.push(createImageSpec(`Image ${i + 1}`));
      }
      return result;
    };
    store.imageSpecs = createImageSpecs();
  });

  return (
    <div class="images-list">
      {store.imageSpecs.map((imageSpec) => (
        <Photo imageSpec={imageSpec} />
      ))}
    </div>
  );
});

export const Photo = component$((props: { imageSpec: ImageSpec }) => {
  const { name, width, height, category, filter } = props.imageSpec;
  const imageRef = useRef();

  const store = useStore({
    url: undefined as string | undefined,
  });

  useClientEffect$(() => {
    store.url = `http://placeimg.com/${width}/${height}/${category}/${filter}`;
    imageRef.current?.setAttribute("src", store.url);
  });

  return (
    <img
      ref={imageRef}
      id="{name}"
      alt={name}
      onClick$={() => console.log(`Clicked ${name}`)}
      loading="lazy"
    />
  );
});
