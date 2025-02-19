
function DashBoardHighlightCard() {
  return (
    <div className="border  lg:w-[50vw] rounded-md bg-primary text-background flex  p-5 justify-between items-center ">
      <div className="flex flex-col justify-between gap-20">
        <div className="lg:text-3xl font-serif  ">
          Zero commission fees for first 1000 in any category.
        </div>
      </div>
      <div>
        <img
          alt="highlight"
          src="working-man-illu.jpg"
          className="w-[20vh] lg:w-[10vw] rounded-lg"
        />
      </div>
    </div>
  );
}

export default DashBoardHighlightCard;
