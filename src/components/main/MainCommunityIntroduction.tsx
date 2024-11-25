import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoins,
  faHandHoldingHeart,
  faHourglassStart,
  faPaw,
} from '@fortawesome/free-solid-svg-icons';

const introduction = [
  {
    title: ' 견주라면 누구나 무료로 사용!',
    description:
      ' 애완견을 키우고 있다면 누구나 무료로 사용 가능합니다! 반려소통을 돕는 다양한 기능들을 제공합니다.',
    icon: faCoins,
    bg: '#fce19c',
  },
  {
    title: ' 애완견을 키울 예정이라면?',
    description:
      '  애완견을 키울 예정이라면 미래댕맘으로 활동하실 수 있어요!  (단, 이용에 제한이 있을 수 있어요!)',
    icon: faHourglassStart,
    bg: '#ffc0a8',
  },
  {
    title: '  견주와 견주를 이어요',
    description:
      ' 댕냥살롱은 편리한 공간을 제공하여 올바른 소통을 할 수 있도록  도와줍니다. 서로의 경험을 나누고, 함께 고민을 해결할 수 있는 곳이에요  :)',
    icon: faHandHoldingHeart,
    bg: '#fce19c',
  },
  {
    title: ' 애완견과 애완견을 이어요',
    description:
      ' 애완견들끼리도 서로 소통할 수 있는 기회를 제공하며, 외롭지 않게 친구를 사귈 수 있도록 돕습니다!',
    icon: faPaw,
    bg: '#ffc0a8',
  },
];

const CommunityIntroduction = () => {
  return (
    <div
      className="p-5 
    xs:py-32 sm:py-32
    flex flex-col items-center justify-center gap-10 min-h-screen  bg-lightPinkbg"
    >
      <div className="text-center max-w-4xl flex flex-col gap-10">
        <h1
          className="text-4xl text-black font-bold
        xs:text-2xl sm:text-2xl
        "
        >
          견주와 애완견의 커뮤니케이션을 위한 최적의 공간
        </h1>
      </div>

      <div
        className="grid grid-cols-1 
    lg:grid-cols-2
    xl:grid-cols-2
      sm:grid-cols-1
      md:grid-cols-2 gap-10  
      justify-center items-center max-w-5xl 
      
      "
      >
        {introduction.map((item, index) => (
          <div
            style={{ backgroundColor: item.bg, opacity: 50 }}
            key={index}
            className="rounded-xl p-6 flex flex-col justify-between items-start w-[380px] h-[350px] shadow-lg"
          >
            <div>
              <h2 className="text-2xl font-semibold text-black pb-5">
                {item.title}
              </h2>
              <p className="text-lg text-gray-700">{item.description}</p>
            </div>
            <FontAwesomeIcon
              icon={item.icon}
              className="size-28 text-darkPink self-end"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityIntroduction;
