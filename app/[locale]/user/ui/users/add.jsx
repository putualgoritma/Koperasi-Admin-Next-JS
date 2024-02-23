'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState, useRef } from "react"
import { storeUser } from '@/app/[locale]/user/lib/dataApi';
import Insert from "@/app/[locale]/user/ui/users/insert";

export default function Add({ messagesIntl }) {

    const cPasswordRef = useRef(null);
    const [data, setData] = useState({
        email: '',
        password: '',
        c_password: '',
        register: '',
        type: '',
        contact_id: '',
        contact: {
            id: '',
            name: '',
            card_id: '',
            birthday: '',
            sex: '',
            email: '',
            phone: '',
            description: ''
        }
    });
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    //generate path
    let pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const listNum = '/' + pathnameArr[3] + '/';
    const pathRandom = Math.floor(Math.random() * 101);
    pathname = pathname.replace(listNum, '/' + pathRandom + '/');

    function resetData() {
        setData({
            email: '',
            password: '',
            c_password: '',
            register: '',
            type: '',
            contact_id: '',
            contact: {
                id: '',
                name: '',
                card_id: '',
                birthday: '',
                sex: '',
                email: '',
                phone: '',
                description: ''
            }
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
            setFormError(true)
            return
        }
        //console.log("data dari form...: ", data)
        setIsMutating(true)

        let dataRequest = {
            user_data: {
                email: data.email,
                password: data.password,
                c_password: data.c_password,
                register: data.register,
                type: data.type,
                contact_id: data.contact.id ? data.contact.id : '',
            }
        }
        //console.log("dataRequest : ", dataRequest)
        const dataUser = await storeUser(dataRequest)
        //console.log("iniiiii dataUser : ", dataUser);
        setIsMutating(false)
        resetData()
        // router.refresh();
        setModal(false)
        const params = new URLSearchParams(searchParams);
        params.set('addresponse', JSON.stringify(dataUser));
        //console.log('uriiii...', `${pathname}?${params.toString()}`)
        router.push(`${pathname}?${params}`);
    }

    const [tab, setTab] = useState(1)

    const [file, setFile] = useState()
    const [imglabel, setImglabel] = useState({
        label1: 'Click to upload',
        label2: 'or drag and drop',
        label3: 'SVG, PNG, JPG or GIF (MAX. 800x400px'
    });

    return (
        <div>
            {modal ?
                <button className="flex items-center justify-center rounded bg-info py-2 px-6 text-white hover:bg-opacity-95 gap-2" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                    </svg>
                    <span>{messagesIntl.input.button.close}</span>
                </button>
                :
                <button className="flex items-center justify-center rounded bg-info py-2 px-6 text-white hover:bg-opacity-95 gap-2" onClick={handleChange}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    {messagesIntl.input.button.create}
                </button>
            }
            <input type="checkbox" name="" checked={modal} onChange={handleChange} className="modal-toggle" id="" />

            <div className="modal z-99999">
                <div className="modal-box w-7/12 max-w-5xl no-scrollbar overflow-hidden  dark:bg-boxdark">
                    {!isMutating && (
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleChange}><svg xmlns="http://www.w3.org/2000/svg" fill="grey" height="25" width="25" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" /></svg></button>
                    )}
                    <div className="no-scrollbar overflow-hidden">
                        <div className="border-b border-stroke py-2 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {messagesIntl.input.button.create} User
                            </h3>
                        </div>

                        <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 p-1 dark:bg-meta-4">
                            <button onClick={() => { setTab(1) }} className={`${tab === 1 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>Account</button>
                            <button onClick={() => { setTab(2) }} className={`${tab === 2 ? 'bg-white rounded-full shadow text-indigo-900' : ''} flex justify-center py-2 `}>Contact</button>
                        </div>

                        <form onSubmit={handleSubmit} className="group">
                            {/* tab 1 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 1 ? "" : "hidden"}`}>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.email} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        type="email" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan email..."  required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Please enter a valid email address
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.password} <span className="text-meta-1">*</span></label>
                                    <input
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        type="password" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan passsword..." pattern=".{6,}" title="Six or more characters" required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Must contain at least 6 or more characters
                                    </span>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.c_password} <span className="text-meta-1">*</span></label>
                                    <input
                                        ref={cPasswordRef}
                                        value={data.c_password}
                                        onChange={(e) => [setData({ ...data, c_password: e.target.value }), setFormError(false)]}
                                        type="password" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primaryinvalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer" placeholder="masukan passsword kembali..." pattern=".{6,}" title="Six or more characters" required />
                                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                        Must contain at least 6 or more characters
                                    </span>
                                    {formError && <span className="mt-2 text-sm text-red-500">
                                        Please confirm password
                                    </span>}
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.register}</label>
                                    <input
                                        value={data.register}
                                        onChange={(e) => setData({ ...data, register: e.target.value })}
                                        type="date" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.type}</label>
                                    <select onChange={(e) => setData({ ...data, type: e.target.value })} className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option disabled selected >{messagesIntl.user.users.type}</option>
                                        <option value={"member"}>{messagesIntl.user.users.type_option.member}</option>
                                        <option value={"staff"}>{messagesIntl.user.users.type_option.staff}</option>
                                        <option value={"admin"}>{messagesIntl.user.users.type_option.admin}</option>
                                    </select>
                                </div>

                            </div>
                            {/* tab 1 end */}

                            {/* tab 2 start */}
                            <div className={`overflow-y-scroll h-75 custom-scrollbar ${tab === 2 ? "" : "hidden"}`}>
                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.users.contact_id}</label>
                                    <div className="flex gap-2">
                                        <input
                                            value={data.contact.name}
                                            type="text" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" placeholder="select contact..." disabled />
                                        <Insert messagesIntl={messagesIntl} setData={setData} data={data} />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.contacts.card_id}</label>
                                    <input
                                        value={data.contact.card_id}
                                        type="email" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" disabled />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.contacts.phone}</label>
                                    <input
                                        value={data.contact.phone}
                                        type="email" className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" disabled />
                                </div>

                                <div className="form-control">
                                    <label className="pt-5 mb-3 block text-black dark:text-white">{messagesIntl.user.contacts.description}</label>
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
                                        {messagesIntl.input.button.close}
                                    </button>
                                )}
                                {!isMutating ? (
                                    <button type="submit" className="btn  btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                                        {messagesIntl.input.button.save}
                                    </button>
                                ) :
                                    (
                                        <button type="button" className="btn loading">
                                            {messagesIntl.input.button.save} ...
                                        </button>
                                    )

                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


}
