// components/VideoPlayer.tsx
"use client";

import React from 'react';
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Video } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface VideoPlayerProps {
  url: string;
  thumbnail: string;
  name: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnail,name }) => {
  
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Card className="w-full aspect-video bg-muted">
      <CardContent className="h-full flex flex-col items-center justify-center p-6">
        <Skeleton className="w-full h-full rounded-lg">
          <div className="flex flex-col items-center justify-center h-full">
            <Skeleton className="h-16 w-16 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-16 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </Skeleton>
      </CardContent>
    </Card>
    );
  }

  if(!url) return (
    <Card className="w-full aspect-video bg-muted">
    <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center">
      <Video className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No Video Available</h3>
      <p className="text-muted-foreground mb-6">
        We could not find a video tutorial for {name}.
      </p>
   
    </CardContent>
  </Card>
  )
  
  return (
    <ReactPlayer
      url={url}
      playing={true}
      controls={true}
        pip={true}
           width='100%'
          height='100%'
          // style={{margin: 'auto', height:'fit-content', width:'fit-content'}}
      light={<Image src={thumbnail} width={640} height={480} alt={name+" video thumbnail"} className=' object-center rounded-lg'/>}
    />
  );
};

export default VideoPlayer;