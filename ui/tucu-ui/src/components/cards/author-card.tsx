import Avatar from '../common/avatar';

type AuthorCardProps = {
  image: string;
  name?: string;
  authorRole?: string;
};

export function AuthorCard({ image, name, authorRole }: AuthorCardProps) {
  const handleClick = () => {
    window.open('https://www.estebanburgos.com.ar/', '_blank', 'noreferrer');
  };
  return (
    <div
      className={`flex items-center rounded-lg cursor-pointer  ${
        name
          ? 'bg-gray-100  p-5  dark:bg-light-dark'
          : 'ml-3 justify-center bg-none p-5 dark:mr-3 dark:bg-none'
      }`}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      <Avatar
        image={image}
        alt={name ? name : ''}
        className="dark:border-gray-400"
      />
      <div className="ltr:pl-3 rtl:pr-3">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {name}
        </h3>
        {authorRole && (
          <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
            {authorRole}
          </span>
        )}
      </div>
    </div>
  );
}

export default AuthorCard;
