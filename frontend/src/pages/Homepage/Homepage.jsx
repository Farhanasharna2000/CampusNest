import CollegeSection from "../../components/Home/CollegeSection";
import CollegeGallery from "../../components/Home/CollegeGallery ";
import CollegeReviewsSection from "../../components/Home/CollegeReviewsSection";
import ExamFinder from "../../components/Home/ExamFinder";
import ResearchPapersSection from './../../components/Home/ResearchPapersSection';

const Homepage = () => {
    return (
        <div>
        <ExamFinder/>
        <CollegeSection/>
        <CollegeGallery/>
        <ResearchPapersSection/>
        <CollegeReviewsSection/>
        </div>
    );
};

export default Homepage;