import Image from '../utils/image';
import AnchorLink from '../links/anchor-link';
import { Verified } from '../icons/verified';
import Avatar from '../common/avatar';

export type NFTGridProps = {
  author: string;
  authorImage: string;
  image: string;
  name: string;
  collection: string;
  price: string;
  profilePath?: string;
};

export function NFTGrid({
  author,
  authorImage,
  image,
  name,
  collection,
  price,
  profilePath,
}: NFTGridProps) {
  return (
    <div className="max-h-fit w-full relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
      <div className="p-4">
        <AnchorLink
          to={profilePath || '/'}
          className="flex items-center text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <Avatar
            image={authorImage}
            alt={name}
            size="sm"
            className="text-ellipsis ltr:mr-3 rtl:ml-3 dark:border-gray-500"
          />
          <span className="overflow-hidden text-ellipsis">@{author}</span>
        </AnchorLink>
      </div>
      <AnchorLink to={'/'} className="relative block w-full">
        <Image
          src={image}
          placeholder="blur"
          alt=""
          className=" object-cover h-full w-full"
        />
      </AnchorLink>

      <div className="p-5">
        <AnchorLink
          to={profilePath || '/'}
          className="text-sm font-medium text-black dark:text-white"
        >
          {name}
        </AnchorLink>
        <div className="mt-1.5 flex">
          <AnchorLink
            to={profilePath || '/'}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400"
          >
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div>
        <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {price}
        </div>
      </div>
    </div>
  );
}

export default NFTGrid;
