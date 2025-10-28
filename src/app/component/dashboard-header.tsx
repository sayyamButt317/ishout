"use client";
// import { useRouter } from "next/navigation";
// import { Avatar } from "@/components/ui/avatar"
// import CustomNotification from "@/app/employer/(dashboard)/components/notification"

export default function DashboardHeader() {
  //   const router = useRouter();
  //   const { data: profileInfo } = UseProfileInfo()
  //   const { data: superAdminInfo } = UseProfileSuperAdmin({
  //     enabled: getAuthRole() === "superadmin",
  //   })

  //   const handleNavigation = () => {
  //     if (getAuthRole() === "superadmin") {
  //       router.push("/admin/profile/account-details")
  //     } else {
  //       router.push("/employer/profile/account-details")
  //     }
  //   }

  //   const organizationName = getAuthRole() === "superadmin" ? superAdminInfo?.organization_name : profileInfo?.organization_name
  //   const firstName = getAuthRole() === "superadmin" ? superAdminInfo?.first_name : profileInfo?.first_name
  //   const imageUrl = getAuthRole() === "superadmin" ? superAdminInfo?.image_url : profileInfo?.image_url

  return (
    <div className=" flex justify-between h-18 mb-8 p-6">
      {/* <div className="font-[Space Grotesk] text-[20px]">{organizationName}</div> */}
      <div className="flex gap-2 items-center">
        {/* <CustomNotification/> */}
        <div
          //   onClick={handleNavigation}
          className="flex w-full sm:w-[184px] h-[50px] border rounded-lg items-center cursor-pointer bg-white hover:bg-gray-100 transition"
        >
          <div className="p-2">
            {/* <Avatar className="w-10 h-10"> */}
            {/* <AvatarImage src={imageUrl || "https://github.com/shadcn.png"} alt="@shadcn" /> */}
            {/* <AvatarFallback>
                {getAuthRole() === "superadmin" ? superAdminInfo?.firstname : profileInfo?.firstname || "IN"}
              </AvatarFallback> */}
            {/* </Avatar> */}
          </div>
          <div className="pl-2">
            {/* <h1 className="font-normal text-sm truncate max-w-[100px]">{firstName}</h1> */}
            {/* <p className="text-sm text-[#A2A1A8]">{getAuthRole() === "superadmin" ? "Super Admin" : "Employer"}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
