import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
const Manager = () => {
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const ref = useRef();
    const passwordRef = useRef();
    const [passwordArry, setPasswordArry] = useState([])

    const copyText = (text) => {
        return () => {
            navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!', {
                icon: '📋',
                description: text.length > 30 ? text.substring(0, 30) + '...' : text,
            });
        }
    }

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArry(JSON.parse(passwords));
        }
    }, [])





    const showpassword = () => {
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
        if (ref.current.src.endsWith("EyeClose.png"))
            ref.current.src = "/icons/EyeOpen.png";
        else
            ref.current.src = "/icons/EyeClose.png";
    }




    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all fields!', {
                icon: '⚠️',
            });
            return;
        }
        const newPassword = {...form, id: uuidv4()};
        setPasswordArry([...passwordArry, newPassword]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArry, newPassword]));
        setform({ site: '', username: '', password: '' });
        toast.success('Password saved successfully!', {
            icon: '🔐',
            description: `Saved credentials for ${form.site}`,
        });
    }


    const deletePassword = (id, showConfirm = true) => {
        if (showConfirm) {
            const passwordToDelete = passwordArry.find(item => item.id === id);
            toast('Delete this password?', {
                icon: '🗑️',
                description: passwordToDelete?.site || 'Unknown site',
                action: {
                    label: 'Delete',
                    onClick: () => {
                        const updatedPasswords = passwordArry.filter(item => item.id !== id);
                        setPasswordArry(updatedPasswords);
                        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
                        toast.success('Password deleted!', {
                            icon: '✅',
                        });
                    }
                },
                cancel: {
                    label: 'Cancel',
                    onClick: () => {}
                },
            });
            return;
        }
        const updatedPasswords = passwordArry.filter(item => item.id !== id);
        setPasswordArry(updatedPasswords);
        localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }

    const editpassword = (id) => {
        const passwordToEdit = passwordArry.find(item => item.id === id);
        setform(passwordToEdit);
        deletePassword(id, false);
        toast.info('Editing password...', {
            icon: '✏️',
            description: `Modify and save to update credentials for ${passwordToEdit?.site}`,
        });
    }

    const handaleChange = (e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value });
    }
    return (
        <>
            <div className="mycontainer">

                <h1 className='py-2 text-4xl font-bold py-2 text-center mb-4'>

                    <span className='py-2 text-green-700'> &lt;</span>
                    Pass
                    <span className='py-2 text-green-700'>OP/&gt;</span>

                </h1>

                <p className='py-2 text-center mb-4 py-2 text-green-900 py-2 text-lg'>Your Own password manager</p>

                <div className="flex flex-col p-4 py-2 text-black gap-3 max-w-md mx-auto items-center bg-white rounded-lg shadow-lg shadow-green-200">

                    <input value={form.site} onChange={handaleChange} placeholder=' Enter website URL' className='rounded-full border border-green-700 w-full py-1' type="py-2 text " name='site' id='' />
                    <div className="flex w-full gap-2 mt-2">
                        <input value={form.username} onChange={handaleChange} placeholder=' Enter username' className='rounded-full border border-green-700 w-full py-1' type="py-2 text " name='username' id='' />
                        <div className="relative gap-3 w-full">
                            <input ref={passwordRef} value={form.password} onChange={handaleChange} placeholder=' Enter Password' className='rounded-full border border-green-700 w-full py-1 px-1' type="py-2 password " name='password' id='' />
                            <span className='absolute right-0 top-2 bottom-2 flex items-center' onClick={showpassword}>
                                <img
                                    ref={ref}
                                    className='cursor-pointer p-1' width={60} src="/icons/EyeOpen.png" alt="Toggle Password Visibility" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='bg-green-500 py-2 text-black font-bold rounded-full py-2 mt-4 flex justify-center items-center gap-2 hover:bg-green-800 transition-colors duration-300 w-fit px-6 border border-green-900'>

                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#000000"
                        >
                        </lord-icon> Save 

                    </button>
                </div>

                <div className="passwords mt-8 max-w-4xl mx-auto">
                    <h2 className='font-bold text-xl'>Your Passwords</h2>
                    {passwordArry.length === 0 && <p className='text-center py-4 text-green-900'>No passwords saved yet.</p>}
                    {passwordArry.length != 0 && <table className="table-auto w-full mt-4 overflow-hidden rounded-lg shadow-lg shadow-green-200">
                        <thead className='bg-green-800 py-2 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArry.map((item, index) => {
                                return <tr key={index} className='border-b border-green-300'>
                                    <td className='p-2'><div className='flex gap-2 items-center copybtn' onClick={copyText(item.site)}><a className='flex-1 overflow-hidden' href={item.site} target='_blank'>{item.site}</a><img className='cursor-pointer w-4' src="/icons/copy.png" alt="copy icon" /></div></td>
                                    <td className='p-2'><div className='flex gap-2 items-center copybtn' onClick={copyText(item.username)}><span className='flex-1 overflow-hidden'>{item.username}</span><img className='cursor-pointer w-4' src="/icons/copy.png" alt="copy icon" /></div></td>
                                    <td className='p-2'><div className='flex gap-2 items-center copybtn' onClick={copyText(item.password)}><span className='flex-1 overflow-hidden'>{item.password}</span><img className='cursor-pointer w-4' src="/icons/copy.png" alt="copy icon" /></div></td>
                                    <td className='p-2'>
                                        <div className='flex justify-center items-center'>
                                            <span className='cursor-pointer mx-1'onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#0a5c15"
                                                    style={{"width":"20px","height":"20px"}}>
                                                </lord-icon>
                                            </span>

                                            <span className='cursor-pointer mx-1' onClick={() => editpassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#000000,secondary:#0a5c15"
                                                    style={{"width":"20px","height":"20px"}}>
                                                </lord-icon>
                                            </span>
                                        </div>


                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
