import { toast } from "../../../../components/ui/use-toast";
import CareerService from "../../../../service/career.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ViewCareer() {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await CareerService.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Career Data Fetch Failed",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }

        if (id) {
            getData(id)
        }
    }, [id])

    const personalProfile = [
        ["Name", data?.name],
        ["Contact", data?.contact],
        ["Email", data?.email],
        ["Family Member", data?.family_member],
        ["Age", data?.age],
        ["Marital Status", data?.marital_status],
        ["Gender", data?.gender],
    ];

    const professionalInterest = [
        ["Education", data?.education],
        ["Certification", data?.certification],
        ["Experience", data?.experience],
        ["Work Interest", data?.work_interest],
        ["Personal Initiative", data?.personal_initiative],
    ];

    const socioCultural = [
        ["Nationality", data?.nationality],
        ["Caste", data?.caste],
        ["Race", data?.race],
        ["Hobbies", data?.hobbies],
        ["Culture", data?.culture],
        ["Faith", data?.faith],
    ];

    const economicalIdentity = [
        ["Income Class", data?.income_class],
        ["Hourly Income", data?.hourly_income],
        ["Monthly Income", data?.monthly_income],
        ["Yearly Income", data?.yearly_income],
        ["Tax Payer Class", data?.tax_payer_class],
        ["House Ownership", data?.house_ownership],
        ["Economic Class", data?.economic_class],
        ["Business Model", data?.business_model],
    ];

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Explore the Way You Want to Work
                    </h1>

                    <p className="mt-3 text-sm font-bold tracking-widest text-[#a8734f]">
                        #EQUALEMPLOYMENTOPPORTUNITY
                    </p>

                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                        {["Equity", "Diversity", "Inclusivity", "Accessibility"].map(
                            (item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-[#b9815b] px-4 py-2 text-sm text-[#a8734f]"
                                >
                                    {item}
                                </span>
                            )
                        )}
                    </div>
                </div>

                <hr className="my-8 border-[#d8c3b3]" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <ViewSection title="Personal Profile" data={personalProfile} />
                    <ViewSection title="Professional Interest" data={professionalInterest} />
                    <ViewSection title="Socio-Cultural" data={socioCultural} />
                    <ViewSection title="Economical Identity" data={economicalIdentity} />
                </div>
            </div>
        </div>
    );
}

function ViewSection({ title, data }) {
    return (
        <div className="rounded-md border border-[#d8cfc8] bg-[#fbfbfb] p-5">
            <h2 className="text-xl font-bold text-[#a8734f]">{title}</h2>
            <div className="mt-3 h-[2px] w-full bg-[#a8734f]" />

            <div className="mt-4 space-y-4">
                {data.map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-md border border-gray-300 bg-white px-3 py-3"
                    >
                        <p className="text-xs font-medium text-[#8c5f43]">{label}</p>
                        <p className="mt-1 text-sm text-gray-700">{value || "-"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}