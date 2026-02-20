function FontDetails() {
  return (
    <div className="absolute contents leading-[normal] left-[100px] text-black top-[87px]" data-name="Font Details">
      <p className="absolute font-['Syne:Bold',sans-serif] font-bold left-[100px] text-[64px] top-[87px]">Typography (Poppins Family)</p>
      <p className="absolute font-['Poppins:Medium',sans-serif] h-[139px] left-[100px] not-italic text-[96px] top-[526px] w-[700px] whitespace-pre-wrap">Lorem ipsum</p>
      <p className="absolute font-['Poppins:Bold',sans-serif] h-[139px] left-[100px] not-italic text-[96px] top-[281px] w-[700px] whitespace-pre-wrap">Lorem ipsum</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[87px] left-[100px] not-italic text-[64px] top-[823px] w-[434px] whitespace-pre-wrap">Lorem ipsum</p>
      <p className="absolute font-['Poppins:Light',sans-serif] h-[54px] left-[100px] not-italic text-[36px] top-[1079px] w-[269px] whitespace-pre-wrap">Lorem ipsum</p>
      <p className="absolute font-['Roboto:Light_Italic',sans-serif] font-light h-[52px] italic left-[100px] text-[48px] top-[474px] w-[112px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Title
      </p>
      <p className="absolute font-['Roboto:Light_Italic',sans-serif] font-light h-[52px] italic left-[100px] text-[48px] top-[229px] w-[234px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Typeface
      </p>
      <p className="absolute font-['Roboto:Light_Italic',sans-serif] font-light h-[52px] italic left-[100px] text-[48px] top-[771px] w-[269px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Headline 1
      </p>
      <p className="absolute font-['Roboto:Light_Italic',sans-serif] font-light h-[52px] italic left-[100px] text-[48px] top-[1027px] w-[240px] whitespace-pre-wrap" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Body text
      </p>
    </div>
  );
}

export default function Typography() {
  return (
    <div className="bg-white relative size-full" data-name="Typography">
      <FontDetails />
    </div>
  );
}