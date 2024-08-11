import React from "react";

const AdvanceField = ({
  advancedFields,
  onInputChange,
  onFileChange,
  onProcessDatesChange,
}) => {
  return (
    <div>
      <div className="border-t-[1px] mt-10 pt-4  border-gray-500 w-full">
        <label className="flex flex-col items-start mr-10 my-5">
          <h1 className="text-[#495677] font-semibold pb-2 text-sm">
            Host Institute Name
          </h1>
          <input
            type="text"
            name="hostInstituteName"
            value={advancedFields.hostInstituteName}
            onChange={onInputChange}
            className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <label className="flex flex-col items-start mr-10 my-5">
            <h1 className="text-[#495677] font-semibold pb-2 text-sm">
              Institute Logo [JPG/PNG (100*110)]
            </h1>
            <input
              type="file"
              className=" border-none w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              id="instituelogo"
              name="instituteLogo"
              onChange={onFileChange}
              placeholder=""
            />
          </label>

          <label className="flex flex-col items-start mr-10 my-5">
            <h1 className="text-[#495677] font-semibold pb-2 text-sm">
              Banner Image [JPG/PNG (1280*320)]
            </h1>
            <input
              type="file"
              className=" border-none w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              name="bannerImage"
              onChange={onFileChange}
              placeholder=""
            />
          </label>

          <label className="flex flex-col items-start mr-10 my-5">
            <h1 className="text-[#495677] font-semibold pb-2 text-sm">
              Campus Recruiting Date
            </h1>
            <input
              type="date"
              className=" border-none w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              name="campusRecruitingDate"
              value={advancedFields.campusRecruitingDate}
              onChange={onInputChange}
              placeholder="Enter campus recruiting date"
            />
          </label>

          <label className="flex flex-col items-start mr-10 my-5">
            <h1 className="text-[#495677] font-semibold pb-2 text-sm">
              Application Deadline
            </h1>
            <input
              type="date"
              className=" border-none w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              name="applicationDeadline"
              value={advancedFields.applicationDeadline}
              onChange={onInputChange}
              placeholder="Enter Application Deadline"
            />
          </label>
        </div>

        <div className="flex items-center my-5">
          <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
            Mode
          </label>
          <div className="flex items-center pb-2">
            <label className="mr-4 flex items-center text-sm text-[#495677]">
              <input
                type="radio"
                name="mode"
                value="public"
                checked={advancedFields.mode === "public"}
                onChange={onInputChange}
                className="mr-2"
              />
              Online
            </label>
            <label className="flex items-center text-sm text-[#495677]">
              <input
                type="radio"
                name="mode"
                value="private"
                checked={advancedFields.mode === "private"}
                onChange={onInputChange}
                className="mr-2"
              />
              Off Campus
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="col-md-4">
            <label className="text-[#495677] font-semibold pb-2 text-sm">
              Campus Process
            </label>
          </div>
          <div className="md:ml-72">
            <div className="flex flex-col items-start">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Preplacement
              </p>
              <div className="flex">
                <input
                  type="text"
                  id="to_preplacement_date"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  placeholder="From Date"
                  name="preplacement.from"
                  value={advancedFields.processDates.preplacement.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  id="to_preplacement_date"
                  className=" w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  placeholder="To Date"
                  name="preplacement.to"
                  value={advancedFields.processDates.preplacement.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start my-4">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Shortlisting
              </p>

              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_shortlisting_date"
                  placeholder="From Date"
                  name="shortlisting.from"
                  value={advancedFields.processDates.shortlisting.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_sshortlisting_date"
                  placeholder="To Date"
                  name="shortlisting.to"
                  value={advancedFields.processDates.shortlisting.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start my-4">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Aptitude Test
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_aptitude_date"
                  placeholder="From Date"
                  name="aptitudeTest.from"
                  value={advancedFields.processDates.aptitudeTest.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_aptitude_date"
                  placeholder="To Date"
                  name="aptitudeTest.to"
                  value={advancedFields.processDates.aptitudeTest.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start my-4">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Cases Study
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_casestudy_date"
                  placeholder="From Date"
                  name="caseStudy.from"
                  value={advancedFields.processDates.caseStudy.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_casestudy_date"
                  placeholder="To Date"
                  name="caseStudy.to"
                  value={advancedFields.processDates.caseStudy.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start my-4">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Technical Test MCQ
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_technicaltest_date"
                  placeholder="From Date"
                  name="technicalTestMCQ.from"
                  value={advancedFields.processDates.technicalTestMCQ.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_technicaltest_date"
                  placeholder="To Date"
                  name="technicalTestMCQ.to"
                  value={advancedFields.processDates.technicalTestMCQ.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start my-4">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Coding Test
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_coding_date"
                  placeholder="From Date"
                  name="codingTest.from"
                  value={advancedFields.processDates.codingTest.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_coding_date"
                  placeholder="To Date"
                  name="codingTest.to"
                  value={advancedFields.processDates.codingTest.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Hackathon
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_hackathon_date"
                  placeholder="From Date"
                  name="hackathon.from"
                  value={advancedFields.processDates.hackathon.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_hackathon_date"
                  placeholder="To Date"
                  name="hackathon.to"
                  value={advancedFields.processDates.hackathon.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Group Discussion
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_groupdiscussion_date"
                  placeholder="From Date"
                  name="groupDiscussion.from"
                  value={advancedFields.processDates.groupDiscussion.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_groupdiscussion_date"
                  placeholder="To Date"
                  name="groupDiscussion.to"
                  value={advancedFields.processDates.groupDiscussion.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
              </div>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-[#a6b1cc] font-semibold pb-2 text-sm">
                Interview
              </p>
              <div className="flex">
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="from_interview_date"
                  placeholder="From Date"
                  name="interview.from"
                  value={advancedFields.processDates.interview.from}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  className="w-20 md:w-full border-none bg-gray-100 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                  id="to_interview_date"
                  placeholder="To Date"
                  name="interview.to"
                  value={advancedFields.processDates.interview.to}
                  onChange={onProcessDatesChange}
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker();
                  }}
                  onBlur={(e) => (e.target.type = "text")}
                />{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start mr-10 my-5">
          <h1 className="text-[#495677] font-semibold pb-2 text-sm">
            Keywords(SEO)
          </h1>
          <input
            type="text"
            className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvanceField;
