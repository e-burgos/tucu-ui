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
    <div className="w-full relative overflow-hidden rounded-xl bg-white shadow-card transition-all duration-200 hover:shadow-large hover:-translate-y-0.5 dark:bg-gray-900 dark:shadow-none dark:ring-1 dark:ring-gray-800">
      <AnchorLink to={'/'} className="block w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          aspectRatio="4/3"
          objectFit="cover"
          containerClassName="w-full transition-transform duration-300 hover:scale-105"
        />
      </AnchorLink>

      <div className="px-4 pb-4 pt-2.5 space-y-2">
        <AnchorLink
          to={profilePath || '/'}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <Avatar
            image={authorImage}
            alt={author}
            size="xs"
            className="ring-2 ring-white dark:ring-gray-800"
          />
          <span className="overflow-hidden text-ellipsis">@{author}</span>
        </AnchorLink>

        <div>
          <AnchorLink
            to={profilePath || '/'}
            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-brand dark:hover:text-brand transition-colors"
          >
            {name}
          </AnchorLink>
          <div className="mt-0.5 flex items-center">
            <AnchorLink
              to={profilePath || '/'}
              className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500"
            >
              {collection}
              <Verified className="h-3.5 w-3.5 text-blue-500" />
            </AnchorLink>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2.5">
          <span className="text-xs text-gray-500 dark:text-gray-500">
            Price
          </span>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default NFTGrid;
