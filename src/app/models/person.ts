export class Person{
    gender: string; // {"male", "female"}
    country: string; // {"Australia", "Brazil", "France", "Other"}
    imageURL: string;
    age: string;
    ageRange: string; // {"child", "teen". "adult"}

    topicTable: { [key: string]: {[key: string]: {[key: string]: string}}} = {
        France: {
            child: {
                male: "Dinosaurs",
                female: "Ballet"
            },
            teen: {
                male: "Bycycles",
                female: "Romance"
            },
            adult: {
                male: "Business",
                female: "Law"
            }
        },
        Brazil:  {
            child: {
                male: "Karate",
                female: "Rainforest"
            },
            teen: {
                male: "Surfing",
                female: "Psychology"
            },
            adult: {
                male: "Football",
                female: "Jewelry"
            }
        },
        Australia:  {
            child: {
                male: "Spiders",
                female: "Geology"
            },
            teen: {
                male: "Rugby",
                female: "Fencing"
            },
            adult: {
                male: "Movies",
                female: "Sculpture"
            }
        },
        Other: {
            child: {
                male: "insect",
                female: "family"
            },
            teen: {
                male: "baseball",
                female: "fashion"
            },
            adult: {
                male: "running",
                female: "cosmetic"
            }
        }
    }
    
    constructor(gender: string, country: string, imageURL: string, age: string){
        this.gender = gender;
        this.country = this.getCountry(country);
        this.imageURL = imageURL;
        this.age = age;
        this.ageRange = this.getRange();
    }

    getRange(): string{
        if (Number(this.age) < 13) return "child";
        else if (Number(this.age) < 20) return  "teen";
        else return "adult";
    }

    getTopic(): string{
        return this.topicTable[this.country][this.ageRange][this.gender];
    }

    getCountry(country: string): string{
        const countryList = ["France", "Brazil", "Australia"];
        if (countryList.includes(country)) return country;
        else return "Other";
    }
}