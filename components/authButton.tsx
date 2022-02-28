import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { getWeb3Modal } from '../auth'
import SecondaryButton from './secondaryButton'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const AuthButton = () => {
    const router = useRouter();
    const [me, setMe] = useState<any>();

    useEffect(() => {
        fetch('/api/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
        })
            .then(res => res.json())
            .then(setMe);
    }, []);

    async function logout() {
        await fetch('/api/logout');
        if (me.address) {
            const web3Modal = getWeb3Modal();
            web3Modal.clearCachedProvider();
        }
        setMe(undefined);
    }

    console.log(me);

    if (!me || !me.sub) {
        return <div className="relative inline-block">
            <SecondaryButton
                className="inline-flex rounded-full ml-2"
                text="Log In"
                onClick={() => router.push('/login')}
            />
        </div>;
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm ml-2 px-4 py-2.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                    <div className="w-20 truncate">{me?.address || me?.email || "Log In"}</div>
                    {me && Object.keys(me).length > 0 && <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="submit"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full text-left px-4 py-2 text-sm'
                                    )}
                                    onClick={logout}
                                >
                                    {me?.address ? "Disconnect" : "Log Out"}
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default AuthButton;
