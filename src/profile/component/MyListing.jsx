import { Button } from "@/components/ui/button";
import { db } from "./../../../configs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarImages, CarListing } from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "@/Shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrashCan } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [deletedId, setDeletedId] = useState();
  const [open, setOpen] = useState(false);

  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarListing.id));

    const resp = Service.FormatResult(result);
    setCarList(resp);
  };

  useEffect(() => {
    GetUserCarListing();
  }, [user]);

  const deleteCarListing = async (id) => {
    try {
      // First, delete associated car images
      await db.delete(CarImages).where(eq(CarImages.carListingId, id));

      // Then, delete the car listing
      const result = await db.delete(CarListing).where(eq(CarListing.id, id));
      console.log("result", result.rowCount);
      if (result.rowCount > 0) {
        console.log(`Car listing with ID ${id} deleted successfully.`);
        return true;
      } else {
        console.log(`No car listing found with ID ${id}.`);
        return false;
      }
    } catch (error) {
      console.error("Error deleting car listing:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const isDeleted = await deleteCarListing(deletedId);
      if (isDeleted) {
        GetUserCarListing();
      }
    } catch (error) {
      console.error("Failed to delete the car listing:", error);
    } finally {
      setOpen(false);
    }
  };
  return (
    <div>
      <div>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-4xl">My Listing</h2>
            <Link to={"/add-listing"}>
              <Button> + Add New Listing</Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-7">
            {carList.map((car, index) => (
              <div key={index}>
                <CarItem car={car} />
                <div className="flex justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                  <Link
                    to={"/add-listing?mode=edit&id=" + car?.id}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setDeletedId(car.id);
                        setOpen(true);
                      }}
                    >
                      <FaTrashCan />
                    </Button>
                  </AlertDialogTrigger>
                </div>
              </div>
            ))}
          </div>

          <AlertDialogContent>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
            <div className="flex justify-end mt-4">
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="ml-2 bg-red-500 hover:bg-red-600"
                onClick={handleDelete}
              >
                Confirm
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default MyListing;
