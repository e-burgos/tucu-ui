import Image from '../utils/image';
import cn from 'classnames';
import AnchorLink from '../links/anchor-link';
import Avatar from '../common/avatar';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
  cover_image: string;
  number_of_artwork: number;
  user: {
    avatar?: string;
    name: string;
    slug: string;
  };
};

export interface CollectionCardProps {
  item: ItemType;
  className?: string;
}

export function CollectionCard({ item, className = '' }: CollectionCardProps) {
  const { name, slug, title, cover_image, number_of_artwork, user } =
    item ?? {};
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className
      )}
    >
      <div className="relative flex aspect-8/11 w-full justify-center overflow-hidden rounded-lg">
        <Image
          src={cover_image}
          placeholder="blur"
          width={600}
          priority="auto"
          alt={name}
        />
      </div>
      <div className="absolute left-0 top-0 z-5 flex h-full w-full flex-col justify-between bg-linear-to-t from-black p-5 md:p-6">
        <AnchorLink
          to={'/' + slug}
          className="absolute left-0 top-0 z-10 h-full w-full"
        />
        <div className="flex justify-between gap-3">
          <div
            className="inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 px-4 text-sm font-medium uppercase -tracking-wide text-white
          backdrop-blur-2xl"
          >
            {name}
          </div>
        </div>
        <div className="block">
          <h2 className="mb-1.5 truncate text-lg font-medium -tracking-wider text-white">
            {title}
          </h2>
          <div className="text-sm font-medium -tracking-wide text-[#B6AAA2]">
            {number_of_artwork} Artworks
          </div>
          <AnchorLink
            to={'/' + user?.slug}
            className="relative z-10 mt-3.5 inline-flex items-center rounded-3xl bg-white/20 p-2 backdrop-blur-2xl"
          >
            <Avatar
              image={user?.avatar as string}
              alt={user?.name}
              size="xs"
              className="rounded-full"
            />

            <div className="truncate text-sm -tracking-wide text-white ltr:ml-2 ltr:pr-2 rtl:mr-2 rtl:pl-2">
              @{user?.name}
            </div>
          </AnchorLink>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
