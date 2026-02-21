function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start leading-[normal] not-italic pt-[30px] relative shrink-0 text-[48px] text-black w-[264px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">Primary Color</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">#013557</p>
    </div>
  );
}

function Primary() {
  return (
    <div className="absolute content-stretch flex gap-[41px] h-[242px] items-start left-[69px] top-[235px] w-[782px]" data-name="Primary">
      <div className="relative shrink-0 size-[248px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 248 248">
          <path d="M0 0H248V248H0V0Z" fill="var(--fill-0, #013557)" id="Rectangle 1" />
        </svg>
      </div>
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start leading-[normal] not-italic pt-[30px] relative shrink-0 text-[48px] text-black w-[264px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">Secondary Color</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">#F4FBFF</p>
    </div>
  );
}

function Secondary() {
  return (
    <div className="absolute content-stretch flex gap-[41px] h-[242px] items-start left-[69px] top-[564px] w-[782px]" data-name="Secondary">
      <div className="bg-[#f4fbff] shrink-0 size-[242px]" />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start leading-[normal] not-italic pt-[30px] relative shrink-0 text-[48px] text-black w-[264px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0">Tertiary Color</p>
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0">#D3FFE7</p>
    </div>
  );
}

function Tertiary() {
  return (
    <div className="absolute content-stretch flex gap-[41px] h-[243px] items-start left-[69px] top-[893px] w-[782px]" data-name="Tertiary">
      <div className="bg-[#d3ffe7] shrink-0 size-[248px]" />
      <Frame2 />
    </div>
  );
}

export default function Colors() {
  return (
    <div className="bg-white relative size-full" data-name="Colors">
      <Primary />
      <Secondary />
      <Tertiary />
      <p className="absolute font-['Syne:Bold',sans-serif] font-bold leading-[normal] left-[69px] text-[64px] text-black top-[71px]">Colors</p>
    </div>
  );
}