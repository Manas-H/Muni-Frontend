import React, { useState, useEffect } from "react";

const countries = [
  { code: "IN", name: "India" },
  { code: "AF", name: "Afghanistan" },
  { code: "AX", name: "Aland Islands" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "ZW", name: "Zimbabwe" },
  // Add more countries as needed
];

const CountrySelect = ({
  selectedCountry: initialCountry,
  onSelectCountry,
}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedCountry(initialCountry);
  }, [initialCountry]);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    onSelectCountry(country);
    setSearchTerm("");
    setTimeout(() => setIsDropdownOpen(false), 0);
  };

  return (
    <div className=" w-full">
      <button
        type="button"
        className="w-full p-0 bg-gray-200 border border-gray-500 flex justify-between items-center px-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>
          {selectedCountry ? selectedCountry.name : "Select a country"}
        </span>
        <i className="fa fa-angle-down" />
      </button>

      {isDropdownOpen && (
        <div className="absolute md:w-[470px] z-10 bg-white shadow-md py-1 text-xs">
          <input
            type="text"
            className="w-full px-3 py-0 border-b border-gray-200 focus:outline-none focus:border-indigo-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-40 overflow-y-auto">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white `}
                onClick={() => handleSelectCountry(country)}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelect;
