"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { updateUser } from "@/app/[locale]/user/lib/dataApi";
import Insert from "@/app/[locale]/user/ui/contacts/insert";

export default function Update({ dataUpd }) {
  const cPasswordRef = useRef(null);
  const [intl, setIntl] = useState(dataUpd.messagesIntl);
  const [data, setData] = useState({
    id: dataUpd.member.id,
    email: dataUpd.member.email,
    password: dataUpd.member.password,
    c_password: dataUpd.member.c_password,
    register: dataUpd.member.register,
    type: dataUpd.member.type,
    contact_id: dataUpd.member.contact_id,
    contact: {
      id: dataUpd.member.contact ? dataUpd.member.contact.id : "",
      name: dataUpd.member.contact ? dataUpd.member.contact.name : "",
      card_id: dataUpd.member.contact ? dataUpd.member.contact.card_id : "",
      birthday: dataUpd.member.contact ? dataUpd.member.contact.birthday : "",
      sex: dataUpd.member.contact ? dataUpd.member.contact.sex : "",
      email: dataUpd.member.contact ? dataUpd.member.contact.email : "",
      phone: dataUpd.member.contact ? dataUpd.member.contact.phone : "",
      description: dataUpd.member.contact
        ? dataUpd.member.contact.description
        : "",
    },
  });
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  //generate path
  let pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const listNum = "/" + pathnameArr[3] + "/";
  const pathRandom = Math.floor(Math.random() * 101);
  pathname = pathname.replace(listNum, "/" + pathRandom + "/");

  function resetData() {
    setData({
      id: "",
      email: "",
      password: "",
      c_password: "",
      register: "",
      type: "",
      contact_id: "",
      contact: {
        id: "",
        name: "",
        card_id: "",
        birthday: "",
        sex: "",
        email: "",
        phone: "",
        description: "",
      },
    });
  }

  const [formError, setFormError] = useState(false);

  function handleChange() {
    setModal(!modal);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (data.password != data.c_password) {
      alert("Please confirm password");
      cPasswordRef.current.focus();
      setFormError(true);
      return;
    }
    setIsMutating(true);

    let dataRequest = {
      id: data.id,
      email: data.email,
      password: data.password,
      c_password: data.c_password,
      register: data.register,
      type: data.type,
      contact_id: data.contact.id ? data.contact.id : "",
    };
    const dataUser = await updateUser(dataRequest);
    setIsMutating(false);
    resetData();
    // router.refresh();
    setModal(false);
    const params = new URLSearchParams(searchParams);
    params.set("addresponse", JSON.stringify(dataUser));
    router.push(`${pathname}?${params}`);
  }

  const [tab, setTab] = useState(1);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="flex items-center space-x-3.5">
      <button className="hover:text-primary" onClick={handleChange}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <input
        type="checkbox"
        name=""
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
        id=""
      />

      <div className="modal z-99999">
        <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
          {!isMutating && (
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleChange}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="grey"
                height="25"
                width="25"
                viewBox="0 0 512 512"
              >
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
            </button>
          )}
          <div className="">
            <div className="border-b border-stroke py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                {intl.input.button.update} User
              </h3>
            </div>

            <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
              <button
                onClick={() => {
                  setTab(1);
                }}
                className={`${
                  tab === 1
                    ? "bg-white rounded-full shadow text-indigo-900"
                    : ""
                } flex justify-center py-2 `}
              >
                Account
              </button>
              <button
                onClick={() => {
                  setTab(2);
                }}
                className={`${
                  tab === 2
                    ? "bg-white rounded-full shadow text-indigo-900"
                    : ""
                } flex justify-center py-2 `}
              >
                Contact
              </button>
            </div>

            <form onSubmit={handleSubmit} className="group">
              {/* tab 1 start */}
              <div
                className={`overflow-y-scroll h-75 custom-scrollbar ${
                  tab === 1 ? "" : "hidden"
                }`}
              >
                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.email}
                  </label>
                  <input
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    type="email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder="masukan email..."
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Please enter a valid email address
                  </span>
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.password}{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    type="password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder="masukan passsword..."
                    pattern=".{6,}"
                    title="Six or more characters"
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Must contain at least 6 or more characters
                  </span>
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.c_password}{" "}
                    <span className="text-meta-1">*</span>
                  </label>
                  <input
                    ref={cPasswordRef}
                    value={data.c_password}
                    onChange={(e) => [
                      setData({ ...data, c_password: e.target.value }),
                      setFormError(false),
                    ]}
                    type="password"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primaryinvalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                    placeholder="masukan passsword kembali..."
                    pattern=".{6,}"
                    title="Six or more characters"
                    required
                  />
                  <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Must contain at least 6 or more characters
                  </span>
                  {formError && (
                    <span className="mt-2 text-sm text-red-500">
                      Please confirm password
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.register}
                  </label>
                  <input
                    value={data.register}
                    onChange={(e) =>
                      setData({ ...data, register: e.target.value })
                    }
                    type="date"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.type}
                  </label>
                  <select
                    onChange={(e) => setData({ ...data, type: e.target.value })}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    required
                  >
                    <option disabled selected>
                      {intl.user.contacts.type}
                    </option>
                    {data.type == "member" ? (
                      <option value={"member"} disabled selected>
                        {intl.user.contacts.member}
                      </option>
                    ) : (
                      <option value={"member"}>
                        {intl.user.contacts.member}
                      </option>
                    )}
                    {data.type == "staff" ? (
                      <option value={"staff"} disabled selected>
                        {intl.user.contacts.staff}
                      </option>
                    ) : (
                      <option value={"staff"}>
                        {intl.user.contacts.staff}
                      </option>
                    )}
                    {data.type == "admin" ? (
                      <option value={"admin"} disabled selected>
                        {intl.user.contacts.admin}
                      </option>
                    ) : (
                      <option value={"admin"}>
                        {intl.user.contacts.admin}
                      </option>
                    )}
                  </select>
                </div>
              </div>
              {/* tab 1 end */}

              {/* tab 2 start */}
              <div
                className={`overflow-y-scroll h-75 custom-scrollbar ${
                  tab === 2 ? "" : "hidden"
                }`}
              >
                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.contact_id}
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={data.contact.name}
                      type="text"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      placeholder="select contact..."
                      disabled
                    />
                    <Insert messagesIntl={intl} setData={setData} data={data} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.card_id}
                  </label>
                  <input
                    value={data.contact.card_id}
                    type="email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.phone}
                  </label>
                  <input
                    value={data.contact.phone}
                    type="email"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  />
                </div>

                <div className="form-control">
                  <label className="pt-5 mb-3 block text-black dark:text-white">
                    {intl.user.contacts.description}
                  </label>
                  <textarea
                    rows={6}
                    placeholder=""
                    value={data.contact.description}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    disabled
                  ></textarea>
                </div>
              </div>
              {/* tab 2 end */}
              <div className="modal-action">
                {!isMutating && (
                  <button type="button" onClick={handleChange} className="btn">
                    {intl.input.button.close}
                  </button>
                )}
                {!isMutating ? (
                  <button
                    type="submit"
                    className="btn  btn-primary group-invalid:pointer-events-none group-invalid:opacity-30"
                  >
                    {intl.input.button.save}
                  </button>
                ) : (
                  <button type="button" className="btn loading">
                    {intl.input.button.save} ...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
