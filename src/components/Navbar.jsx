import React from "react"

const Navbar = () =>{
    return(
        <nav className="flex justify-between bg-blue-300  p-4">
            <div className="log font-bold text-2xl ">iPass</div>
            <ul>
                <li className="flex gap-4">
                    <a className="hover:font-bold" href="/">Home</a>
                    <a className="hover:font-bold" href="#">About</a>
                    <a className="hover:font-bold" href="#">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar