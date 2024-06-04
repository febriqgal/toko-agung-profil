import { AppConfig } from "@/constants/app.config";
import Image from "next/image";

import React from "react";
import { Facebook, Instagram, Whatsapp } from "react-huge-icons/bulk";

export default function FooterMain() {
  return (
    <footer className="bg-primary-200 lg:grid lg:grid-cols-5 border-t-1">
      <div className="relative block h-32 lg:col-span-2 lg:h-full">
        <Image
          src="https://images.unsplash.com/photo-1632758822822-899ee7daaa15?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h1 className="block text-2xl font-bold sm:text-3xl">
              {AppConfig.title}
            </h1>

            <ul className="mt-8 space-y-1 text-sm text-primary-700">
              <li>Buka Setiap Hari: 10.00 - 17.00</li>
            </ul>

            <ul className="flex gap-6 mt-8">
              <li>
                <Facebook className="w-6 h-6 text-primary-900" />
              </li>
              <li>
                <Whatsapp className="w-6 h-6 text-primary-900" />
              </li>
              <li>
                <Instagram className="w-6 h-6 text-primary-900" />
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <iframe
              className="rounded-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.26035292828!2d100.39403837364505!3d-0.9582317353528109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b982fd776c89%3A0x4e9e1c8dcc9c55fb!2sUniversitas%20Putra%20Indonesia%20%22YPTK%22!5e0!3m2!1sid!2sid!4v1714745692880!5m2!1sid!2sid"
            />
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-primary-100">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a
                  href="#"
                  className="transition text-grey-500 hover:opacity-75"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition text-grey-500 hover:opacity-75"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition text-grey-500 hover:opacity-75"
                >
                  Cookies
                </a>
              </li>
            </ul>

            <p className="mt-8 text-xs text-grey-500 sm:mt-0">
              &copy; 2024. {AppConfig.title}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
