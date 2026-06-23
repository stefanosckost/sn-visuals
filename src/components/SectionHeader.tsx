type SectionHeaderProps = {
  label: string;
  title: string;
  body?: string;
};

export function SectionHeader({ label, title, body }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <p className="lab-label text-xs font-semibold uppercase text-[#46f0e5]">
        {label}
      </p>
      <h2 className="font-display mt-4 whitespace-pre-line text-balance text-4xl font-semibold leading-[0.98] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#f4f1ea]/62 sm:text-base">
          {body}
        </p>
      ) : null}
    </div>
  );
}
