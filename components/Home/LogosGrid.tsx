import Image from "next/image";
import Group1 from "../../public/assets/logos/Group1.png";
import Group2 from "../../public/assets/logos/Group2.png";
import Group3 from "../../public/assets/logos/Group3.png";
import Group4 from "../../public/assets/logos/Group4.png";
import Group5 from "../../public/assets/logos/Group5.png";

const LogosGrid = () => {
  return (
    <div className="py-20 bg-[#EEF4FA]">
      <div className="max-w-screen-2xl mx-auto px-2 flex-wrap gap-x-10 justify-center items-center md:flex lg:flex-nowrap">
        <div className="max-w-2xl space-y-2 font-Poppins">
          <ul className="flex space-x-5">
            <li>
              <p className="font-semibold text-4xl mb-3 text-primary">100+</p>
              <span className="font-normal text-base mb-3 text-primary">Registered students</span>
            </li>
            <li>
              <p className="font-semibold text-4xl mb-3 text-primary">30+</p>
              <span className="font-normal text-base mb-3 text-primary">Expert Instructor</span>
            </li>
            <li>
              <p className="font-semibold text-4xl mb-3 text-primary">52+</p>
              <span className="font-normal text-base mb-3 text-primary">Various Courses</span>
            </li>
          </ul>
        </div>
        <div className="flex-none mt-12 text-white lg:mt-0">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-5  items-center justify-center  [&>*]:w-full  [&>*]:flex lg:[&>*]:px-10">
            {/* LOGO 1 */}
            <li>
              <Image src={Group1} alt="Logo group Avatar" width={120} height={34} className="pb-3 lg:pb-0" />
            </li>

            {/* LOGO 2 */}
            <li>
              <Image src={Group2} alt="Logo group Avatar" width={120} height={34} className="pb-3 lg:pb-0" />
            </li>

            {/* LOGO 3 */}
            <li>
              <Image src={Group3} alt="Logo group Avatar" width={120} height={34} className="pb-3 lg:pb-0" />
            </li>

            {/* LOGO 4 */}
            <li>
              <Image src={Group4} alt="Logo group Avatar" width={120} height={34} className="pb-3 lg:pb-0" />
            </li>
            {/* LOGO 5 */}
            <li>
              <Image src={Group5} alt="Logo group Avatar" width={120} height={34} className="pb-3 lg:pb-0" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogosGrid;
