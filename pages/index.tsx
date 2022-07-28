import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    //  <div className="bg-slate-400 py-10 px-5 flex flex-col space-y-5">
    <div className="bg-slate-400 py-20 px-5 grid gap-10">
      <div className="bg-white p-6 rounded-3xl shadow-xl ">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between my-5">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-2/4 mx-auto">
          Checkout
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-2xl">profile</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 justify-between items-end">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Order</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-400 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="flex flex-col items-center -mt-10 -mb-5">
            <span className="text-lg font-medium">Tony</span>
            <span>washington</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-3xl shadow-xl">
        <div className=" mb-5 justify-between items-center">
        <div className="flex justify-between items-center h-10">
          <span>⬅</span>
          <div className="space-x-3">
            <span>★ 4.9</span>
            <span className="shadow-xl p-2 rounded-md">♥️</span>
          </div>
          </div>
          <div className="bg-zinc-400 h-72"/>
          <div className="flex flex-col">
            <span className="font-medium text-xl">Swoon Loung</span>
            <span className="text-xs text-gray-500">Chair</span>
            <div className="flex justify-between item-center mt-3 mb-5">
              <div className="felx items-center space-x-2">
                <button className="w-5 h-5 rounded-full bg-yellow-300"/>
                <button className="w-5 h-5 rounded-full bg-indigo-300"/>
                <button className="w-5 h-5 rounded-full bg-teal-300"/>
              </div>
              <div>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
            <div>
              <span>$450</span>
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
