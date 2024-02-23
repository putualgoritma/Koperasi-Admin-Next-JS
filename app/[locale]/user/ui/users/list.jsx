import Update from "@/app/[locale]/user/ui/users/update";

export default function List({ members,messagesIntl }) {  

  //console.log('members', members)  
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            No.
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.users.code}
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.users.email}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            {messagesIntl.user.users.type}
          </th>
          <th className="py-4 px-4 font-medium text-black dark:text-white">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {members.map((member, index) => (
          <tr key={index}>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {index + 1}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {member.code}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {member.email}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {member.type}
              </p>
            </td>
            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
              <div className="flex items-center space-x-3.5">
                <button className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                </button>
                <button className="hover:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
                <Update dataUpd={{member:member,messagesIntl:messagesIntl}} />
              </div>
            </td>
          </tr>

          // <tr className={` ${member.status == 'pending' ? 'bg-yellow-100 dark:bg-yellow-500' : member.status == 'close' ? 'bg-red-100 dark:bg-red-500' : ''} hover:bg-gray-200 dark:hover:bg-gray-500`} key={member.id}>


          //   <td className="text-lg p-2.5 text-black dark:text-white" >{index + 1}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{member.code}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{member.email}</td>
          //   <td className="text-lg p-2.5 text-black dark:text-white">{member.type}</td>
          //   <td>
          //     <DeleteMember member={...member}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <Update member={...member}  refresh = {refresh} setRefresh = {setRefresh}/>
          //     <DetailMember {...member} />
          //   </td>

          // </tr>
        ))}

      </tbody>
    </table>
  );

}
