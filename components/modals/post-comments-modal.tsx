import { usePostCommentsModal } from "@/hooks/use-post-comments-modal";
import { Modal } from "@/components/ui/modal";
import Comment from "@/components/comment";

const PostCommentsModal = () => {
  const postCommentsModal = usePostCommentsModal();

  const comments = postCommentsModal.comments;

  return (
    <Modal
      title="Explore Comments"
      description="Discover a tapestry of user perspectives"
      isOpen={postCommentsModal.isOpen}
      onClose={postCommentsModal.onClose}
    >
      <div className="max-h-72 overflow-y-auto">
        <div className="space-y-4 py-2 pb-4">
          <>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                //@ts-ignore
                profile={comment.profile}
                comment={comment}
              />
            ))}
          </>
        </div>
      </div>
    </Modal>
  );
};

export default PostCommentsModal;
